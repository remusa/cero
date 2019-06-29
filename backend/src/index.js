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

const FRONTEND_URL =
    process.env.NODE_ENV !== 'development' ? process.env.FRONTEND_URL : process.env.LOCAL_HOST

console.log(`FRONTEND_URL: ${FRONTEND_URL}`)

server.express.use(cors({ credentials: true, origin: FRONTEND_URL }))

const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'"],
            scriptSrc: ["'self'"],
        },
    },
}
server.express.use(helmet())

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

server.start(
    {
        cors: false, // disable apollo server cors
    },
    deets => {
        console.log(`Server is now running on port http://localhost:${deets.port}`)
    }
)
