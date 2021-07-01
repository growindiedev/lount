
const { ApolloServer, PubSub } = require('apollo-server')
const { PrismaClient, Prisma } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()


const prisma = new PrismaClient()


const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs/typesDefs')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => {
    let token
    if (context.req && context.req.headers.authorization) {
      token = context.req.headers.authorization.split('Bearer ')[1]
    } else if (context.connection && context.connection.context.Authorization) {
      token = context.connection.context.Authorization.split('Bearer ')[1]
    }
  
    if (token) {
      jwt.verify(token, process.env.SECRET , (err, decodedToken) => {
        context.currentUser = decodedToken
      })
    }
    
    context.pubsub = pubsub
    context.pubsub = pubsub
  
    return context
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
  
})