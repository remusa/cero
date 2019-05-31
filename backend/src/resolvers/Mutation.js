const { forwardTo } = require('prisma-binding')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')
const { transport, createEmail } = require('../utils/mail')
const { hasPermission } = require('../utils/utils')
const { timeConversion } = require('../utils/timeConversion')
// const stripe = require('../utils/stripe')

const COOKIE_LENGTH = 1000 * 60 * 60 * 24 * 365 // 1 year cookie

const Mutations = {
    async createFast(parent, args, ctx, info) {
        // TODO: check if user is logged in
        // if (!ctx.request.userId) {
        // throw new Error('You must be logged in to do that!')
        // }
        console.log(`CREATING FAST WITH STARTDATE: ${args.startDate}`)
        const fast = await ctx.db.mutation.createFast(
            {
                data: {
                    user: {
                        connect: {
                            // TODO: get id from context
                            // id:  ctx.request.userId,
                            id: 'cjvifoe55b2ct0b733fieqq3x',
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
        // TODO: check if user is logged in
        // if (!ctx.request.userId) {
        // throw new Error('You must be logged in to do that!')
        // }
        console.log(`BACKEND 1. STOPPING | ID: ${args.id}`)
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
        console.log(`2. STOPPED | ID: ${args.id}`)
        return stoppedFast
    },
    async updateFast(parent, args, ctx, info) {
        // TODO: check if user is logged in
        // if (!ctx.request.userId) {
        // throw new Error('You must be logged in to do that!')
        // }
        const updates = { ...args }
        if (updates.endDate && updates.startDate > updates.endDate) {
            throw new Error('Ending date must be after start date')
        }
        const duration = timeConversion(new Date(updates.startDate), new Date(updates.endDate))
        updates.duration = duration.milliseconds
        delete updates.id
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
        // TODO: check if user is logged in
        // if (!ctx.request.userId) {
        // throw new Error('You must be logged in to do that!')
        // }
        const deletedFast = await ctx.db.mutation.deleteFast(
            {
                where: { id: args.id },
            },
            info
        )
        return deletedFast
    },
    async signup(parent, args, ctx, info) {
        if (args.name.length < 3) {
            throw new Error('Username must be at least 3 characters long')
        }
        if (args.password.length < 10) {
            throw new Error('Password must be at least 10 characters long')
        }
        if (args.email.indexOf('@') === -1) {
            throw new Error('Invalid email')
        }
        args.email = args.email.toLowerCase().trim()
        const password = await bcrypt.hash(args.password, 12)
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
        const email = args.email.trim()
        const { password } = args
        const user = await ctx.db.query.user({ where: { email } })
        if (!user) {
            throw new Error(`User with email ${email} doesn't exist`)
        }
        const valid = await bcrypt.compare(password, user.password)
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
        const mailRes = await transport.sendMail({
            from: `${process.env.MAIL_ADDRESS}}m`,
            to: user.email,
            subject: 'Password Reset Token',
            html: createEmail(`Your Password Reset Token is Here!
            \n\n
            <a href=${
                process.env.FRONTEND_URL
            }/reset?resetToken=${resetToken}>Click here to reset</a>`),
        })
        return { message: 'Thanks!' }
    },
    async resetPassword(parent, args, ctx, info) {
        if (args.password !== args.confirmPassword) {
            throw new Error("Passwords don't match")
        }
        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000,
            },
        })
        if (!user) {
            throw new Error('Token is invalid or has expired')
        }
        const password = await bcrypt.hash(args.password, 12)
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
}

module.exports = Mutations
