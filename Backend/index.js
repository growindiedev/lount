
const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')

const resolvers = require('./resolvers/resolvers')
const typeDefs = require('./typeDefs/types')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      return decodedToken
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
  
})