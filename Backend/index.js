
const { ApolloServer } = require('apollo-server')
const { PrismaClient, Prisma } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()


const resolvers = require('./resolvers/resolvers')
const typeDefs = require('./typeDefs/types')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await prisma.user.findUnique({
        where : {
          username: decodedToken.username
        }
      })
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
  
})