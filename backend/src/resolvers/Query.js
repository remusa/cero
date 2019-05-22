const { forwardTo } = require('prisma-binding')
const { hasPermission } = require('../utils/utils')

const Query = {
    fast: forwardTo('db'),
    fasts: forwardTo('db'),
    fastsConnection: forwardTo('db'),
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
    async users(parent, args, ctx, info) {
        // TODO: check if user is logged in
        // if (!ctx.request.userId) {
        // throw new Error('You must be logged in to do that!')
        // }
        // TODO: check if user has permission to check users
        // hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
        return ctx.db.query.users({}, info)
    },
}

module.exports = Query
