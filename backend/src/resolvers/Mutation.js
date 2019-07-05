// const { forwardTo } = require('prisma-binding')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')
const sgMail = require('@sendgrid/mail')
const yup = require('yup')
const { hasPermission } = require('../utils/utils')
const { timeConversion } = require('../utils/timeConversion')
const { transport, createEmail } = require('../utils/mail')
// const stripe = require('../utils/stripe')

const validationSchemas = require('../utils/validationSchemas')

const {
    usernameValidation,
    emailValidation,
    passwordValidation,
    confirmPasswordValidation,
} = validationSchemas

const COOKIE_LENGTH = 1000 * 60 * 60 * 24 * 365 // 1 year cookie

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const Mutations = {
    async createFast(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!')
        }
        const fast = await ctx.db.mutation.createFast(
            {
                data: {
                    user: {
                        connect: {
                            id: ctx.request.userId,
                        },
                    },
                    ...args,
                },
            },
            info
        )
        return fast
    },
    async stopFast(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!')
        }
        const fastInfo = await ctx.db.query.fast({
            where: { id: args.id },
        })
        if (!fastInfo) throw new Error(`Fast doesn't exist: ${args.id}`)
        const startDate = new Date(fastInfo.startDate)
        const endDate = new Date()
        const duration = timeConversion(startDate, endDate)
        const updates = { ...args, endDate, isActive: false, duration: duration.milliseconds }
        delete updates.id
        const stoppedFast = await ctx.db.mutation.updateFast(
            {
                data: updates,
                where: { id: args.id },
            },
            info
        )
        return stoppedFast
    },
    async updateFast(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!')
        }
        const updates = { ...args }
        delete updates.id
        if (updates.endDate && updates.startDate > updates.endDate) {
            throw new Error('Ending date must be after start date')
        }
        if (args.endDate) {
            const duration = timeConversion(new Date(updates.startDate), new Date(updates.endDate))
            updates.duration = duration.milliseconds
        } else {
            delete updates.endDate
        }
        const updatedFast = await ctx.db.mutation.updateFast(
            {
                data: updates,
                where: { id: args.id },
            },
            info
        )
        return updatedFast
    },
    async deleteFast(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!')
        }
        const deletedFast = await ctx.db.mutation.deleteFast(
            {
                where: { id: args.id },
            },
            info
        )
        return deletedFast
    },
    async signup(parent, args, ctx, info) {
        const validationSchema = yup.object().shape({
            name: usernameValidation,
            email: emailValidation,
            password: passwordValidation,
        })
        let isValid = false
        await validationSchema
            .isValid({
                name: args.name,
                email: args.email,
                password: args.password,
            })
            .then(valid => (isValid = valid))
        if (!isValid) throw new Error(`Validation error`)

        // if (args.name.length < 3) {
        //     throw new Error('Username must be at least 3 characters long')
        // }
        // if (args.password.length < 10) {
        //     throw new Error('Password must be at least 10 characters long')
        // }
        // args.email = args.email.toLowerCase().trim()
        // if (args.email.indexOf('@') === -1) {
        //     throw new Error('Invalid email')
        // }

        const password = await argon2.hash(args.password)
        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    ...args,
                    password,
                    permissions: { set: ['USER'] },
                },
            },
            info
        )
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: COOKIE_LENGTH,
        })
        return user
    },
    async signin(parent, args, ctx, info) {
        const validationSchema = yup.object().shape({
            email: emailValidation,
            password: passwordValidation,
        })
        let isValid = false
        await validationSchema
            .isValid({
                email: args.email,
                password: args.password,
            })
            .then(valid => (isValid = valid))
        if (!isValid) throw new Error(`Validation error`)

        // if (args.password.length < 10) {
        //     throw new Error('Password must be at least 10 characters long')
        // }
        const email = args.email.toLowerCase().trim()
        // if (email.indexOf('@') === -1) {
        //     throw new Error('Invalid email')
        // }

        const { password } = args
        const user = await ctx.db.query.user({ where: { email } })
        if (!user) {
            throw new Error(`An account with email: ${email} doesn't exist`)
        }
        const valid = await argon2.verify(user.password, password)
        if (!valid) {
            throw new Error('Invalid password')
        }
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: COOKIE_LENGTH,
        })
        return user
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token')
        return { message: 'Goodbye' }
    },
    async requestReset(parent, args, ctx, info) {
        const validationSchema = yup.object().shape({
            email: emailValidation,
        })
        let isValid = false
        await validationSchema
            .isValid({
                email: args.email,
            })
            .then(valid => (isValid = valid))
        if (!isValid) throw new Error(`Validation error`)

        const user = await ctx.db.query.user({ where: { email: args.email } })
        if (!user) {
            throw new Error(`User with email ${args.email} doesn't exist`)
        }
        const randomBytesPromisified = promisify(randomBytes)
        const resetToken = (await randomBytesPromisified(20)).toString('hex')
        const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now
        const res = await ctx.db.mutation.updateUser({
            where: { email: args.email },
            data: { resetToken, resetTokenExpiry },
        })
        const mailOptions = {
            from: `${process.env.MAIL_ADDRESS}`,
            to: user.email,
            subject: 'Password Reset Token',
            html: createEmail(`Your Password Reset Token is Here!
            \n\n
            <a href=${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}>Click here to reset</a>`),
        }
        // const mailRes = await transport.sendMail(mailOptions)
        sgMail.send(mailOptions)
        return { message: 'Thanks!' }
    },
    async resetPassword(parent, args, ctx, info) {
        // const validationSchema = yup.object().shape({
        //     password: passwordValidation,
        //     confirmPassword: confirmPasswordValidation,
        // })
        // let isValid = false
        // await validationSchema
        //     .isValid({
        //         password: passwordValidation,
        //         confirmPassword: confirmPasswordValidation,
        //     })
        //     .then(valid => (isValid = valid))
        // if (!isValid) throw new Error(`Validation error`)

        if (args.password !== args.confirmPassword) throw new Error("Passwords don't match")

        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000,
            },
        })
        if (!user) {
            throw new Error('Token is invalid or has expired')
        }
        const password = await argon2.hash(args.password)
        const updatedUser = await ctx.db.mutation.updateUser({
            where: { email: user.email },
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null,
            },
        })
        const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET)
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: COOKIE_LENGTH,
        })
        return updatedUser
    },
    async updatePermissions(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!')
        }
        const currentUser = await ctx.db.query.user(
            {
                where: {
                    id: ctx.request.userId,
                },
            },
            info
        )
        hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE'])
        return ctx.db.mutation.updateUser(
            {
                data: {
                    permissions: {
                        set: args.permissions,
                    },
                },
                where: {
                    id: args.userId,
                },
            },
            info
        )
    },
    async updateUser(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!')
        }
        const updates = { ...args }
        if (args.goal && args.goal <= 0) {
            throw new Error('New goal must be greater than 0')
        }
        if (args.goal) {
            updates.goal = Number.parseInt(args.goal)
        }
        const updatedUser = await ctx.db.mutation.updateUser({
            data: updates,
            where: { id: ctx.request.userId },
        })
        return updatedUser
    },
    // async subscribeUser(parent, args, ctx, info) {
    //     const {userId}= ctx.request
    //     if (!userId) {
    //         throw new Error('You must be logged in to do that!')
    //     }
    //     console.log(`SUBSCRIBING USER`)
    //     const user = await ctx.db.query.user(
    //         { where: { id: userId}},
    //         `{
    //             subscription
    //         }
    //         `
    //     )
    //     const amount = 1
    //     const charge = await stripe.charges.create({
    //         amount,
    //         currency: 'USD',
    //         source: args.token
    //     })
    //     const updates = {
    //         subscription: true,
    //     }
    //     const updatedUser = await ctx.db.mutation.updateUser({
    //         data: updates,
    //         where: { id: userId },
    //     })
    //     return updatedUser
    // }
}

module.exports = Mutations
