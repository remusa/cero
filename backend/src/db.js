// This file connects to the remote prisma DB and gives us the ability to query it with JS
const { Prisma } = require('prisma-binding')

const END_POINT =
    process.env.NODE_ENV !== 'development' ? process.env.PRISMA_ENDPOINT : process.env.DEV_ENDPOINT

console.log( `ENVIRONMENT: ${process.env.NODE_ENV}`)
console.log(`END_POINT: ${END_POINT}`)

const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: END_POINT,
    secret: process.env.PRISMA_SECRET,
    debug: false,
})

module.exports = db
