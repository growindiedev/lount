
const { ApolloServer } = require('apollo-server')

const resolvers = require('./resolvers/resolvers')
const typeDefs = require('./typeDefs/types')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
  
})