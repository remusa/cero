const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Mutations = {
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase()

        const password = await bcrypt.hash(args.password, 12)

        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    ...args,
                    password,
                },
            },
            info
        )

        return user
    },
}

module.exports = Mutations
