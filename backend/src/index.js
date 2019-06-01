const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const helmet = require('helmet')

require('dotenv').config({ path: '.env' })

const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

server.express.use(bodyParser.json())
server.express.use(bodyParser.urlencoded({ extended: true }))
server.express.use(cookieParser())

// Security features
server.express.use(
    helmet({
        hidePoweredBy: { setTo: 'PHP 4.2.0' },
        xssFilter: { setOnOldIE: true },
        // frameguard: { action: 'deny' },
        // contentSecurityPolicy: {
        //     directives: {
        //         defaultSrc: ["'self'"],
        //         scriptSrc: ["'self'"],
        //         styleSrc: ["'self'"],
        //     },
        // },
    })
)

// Decode JWT and pass it to each request
server.express.use((req, res, next) => {
    const { token } = req.cookies
    if (token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET)
        req.userId = userId
    }
    next()
})

// Populate the user on each request
server.express.use(async (req, res, next) => {
    if (!req.userId) return next()
    const user = await db.query.user(
        { where: { id: req.userId } },
        '{ id, email, name, permissions }'
    )
    req.user = user

    next()
})

// server.express.use(cors({ origin: '*' }))
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
