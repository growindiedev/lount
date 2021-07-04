const { PrismaClient } = require('@prisma/client')
const userResolvers = require('./users')
const messageResolvers = require('./messages')
const client = new PrismaClient()



module.exports = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },

  Reaction: {
    createdAt: (parent) => parent.createdAt.toISOString(),
    Message: async (parent) => await client.message.findUnique({where: {
      id: parent.messageId
    }}),
    User: async (parent) =>
      await client.user.findUnique({
        where: {
        id: parent.userId
        },
        select: {
          username: true, imageUrl: true, createdAt: true
        }
      }),
  },

  User: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },

  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query,
  },
  
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
  },
  Subscription: {
    ...messageResolvers.Subscription,
  },
}