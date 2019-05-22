// const { forwardTo } = require('prisma-binding')
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
        const fastInfo = await ctx.db.query.fast({
            where: { id: args.id },
        })
        const startDate = new Date(fastInfo.startDate)
        const endDate = new Date()
        const { hours } = timeConversion(startDate, endDate)
        const updates = { ...args, endDate, isActive: false, duration: hours }
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
    async updateFast(parent, args, ctx, info) {
        // TODO: check if user is logged in
        // if (!ctx.request.userId) {
        // throw new Error('You must be logged in to do that!')
        // }
        const updates = { ...args }
        delete updates.id
        console.log('UPDATING FAST: ', updates)
        const updatedFast = await ctx.db.mutation.updateFast(
            {
                data: updates,
                where: { id: args.id },
            },
            info
        )
        return updatedFast
    },
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase()
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
    async signin(parent, { email, password }, ctx, info) {
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
            throw new Error("Passwords doesn't match")
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
