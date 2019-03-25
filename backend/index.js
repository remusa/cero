const { GraphQLServer } = require('graphql-yoga')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const cors = require('cors')
const helmet = require('helmet')
const jwt = require('jsonwebtoken')

require('dotenv').config({ path: '.env' })

const server = createServer()
const db = require('./db')

// server.server.express.use('/public', express.static(`${process.cwd()}/public`))

server.express.use(cors({ origin: '*' }))

server.express.use(bodyParser.json())
server.express.use(bodyParser.urlencoded({ extended: true }))
server.express.use(cookieParser())

// Security features
server.express.use(
    helmet({
        hidePoweredBy: { setTo: 'PHP 4.2.0' },
        frameguard: { action: 'deny' },
        xssFilter: { setOnOldIE: true },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'"],
            },
        },
    })
)

// Not Found Middleware
// server.app.use((req, res, next) => {
//     res.status(404)
//         .type('text')
//         .send('Not Found')
// })

server.start(
    {
        cors: {
            credentials: true,
            origin: process.env.FRONTEND_URL,
        },
    },
    deets => {
        console.log(`Server is now running on port http://localhost:${deets.port}`)
    }
)
