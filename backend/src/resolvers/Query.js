const { forwardTo } = require('prisma-binding')
const { hasPermission } = require('../utils')

const Query = {
    me(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            return null
        }
        return ctx.db.query.user(
            {
                where: { id: ctx.request.userId },
            },
            info
        )
    },
    // users: forwardTo('db'),
    async users(parent, args, ctx, info) {
        // if (!ctx.request.userId) {
        //     throw new Error('You must be logged in!')
        // }
        console.log(ctx.request.userId)
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
        return ctx.db.query.users({}, info)
    },
}

module.exports = Query
