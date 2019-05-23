const END_POINT = require('./config')

const URI = process.env.NODE_ENV === 'dev' ? END_POINT : END_POINT
const token = localStorage.getItem('token') || null

module.exports = {
    client: {
        excludes: ['**/__tests__/**/*'],
        service: {
            name: 'cero',
            url: URI,
            // optional headers
            headers: {
                authorization: token,
            },
            // optional disable SSL validation check
            skipSSLValidation: true,
        },
    },
}

// module.exports = {
//     client: {
//         service: {
//             name: 'cero',
//             localSchemaFile: './path/to/schema.graphql'
//         }
//     }
// }
