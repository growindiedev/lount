const { UserInputError, AuthenticationError, withFilter, PubSub } = require('apollo-server')
const { PrismaClient, Prisma } = require('@prisma/client')
require('dotenv').config()

const client = new PrismaClient

module.exports = {
    Query: {
        getMessages: async (root, {from},  {currentUser} ) => {

        try {
            if (!currentUser) throw new AuthenticationError('Unauthenticated')
             const otherUser = await client.user.findUnique ({
                 where: {
                     username: from
                 }
             })
             if (!otherUser) throw new UserInputError('User not found')
           // const usernames = [currentUser.username, otherUser.username]

            const messages = await client.message.findMany({
                where: {
                                     
                    from: {in: [currentUser.username, otherUser.username]},
                    to: {in: [currentUser.username, otherUser.username]},

                },

                orderBy: {
                    createdAt: 'desc'
                } 
            })
            return messages
        } catch (erri){
            console.log(erri)
            }  

        }
    },

    Mutation: {
        sendMessage: async (parent, { to, content }, {currentUser, pubsub}) => {
            try {
                if (!currentUser) throw new AuthenticationError('Unauthenticated')
                const recipient = await client.user.findUnique({
                    where: { username: to }
                })

                if (!recipient) {
                    throw new UserInputError('User not found')
                  } else if (recipient.username === currentUser.username) {
                    throw new UserInputError('You cant message yourself')
                  }
            
                  if (content.trim() === '') {
                    throw new UserInputError('Message is empty')
                  }

                  const message = await client.message.create({
                      data: {
                          from: currentUser.username,
                          to,
                          content
                      }
                  })

                  pubsub.publish('NEW_MESSAGE', { newMessage: message })
                  return message

            } catch (err) {
                console.log(err)
                throw err
            }
        }
    },

    Subscription: {
        newMessage: {
          subscribe: withFilter(
            (_, __, {  currentUser, pubsub }) => {
              if (!currentUser) throw new AuthenticationError('Unauthenticated')
              return pubsub.asyncIterator(['NEW_MESSAGE'])
            },
            ({ newMessage }, _, { currentUser }) => {
              if (
                newMessage.from === currentUser.username ||
                newMessage.to === currentUser.username
              ) {
                return true
              }
    
              return false
            }
          ),
        },
      },
    }