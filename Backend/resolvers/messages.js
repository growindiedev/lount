const { UserInputError, AuthenticationError, withFilter, ForbiddenError } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
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
            const messages = await client.message.findMany({
                where: {
                                     
                    from: {in: [currentUser.username, otherUser.username]},
                    to: {in: [currentUser.username, otherUser.username]},

                },

                orderBy: {
                    createdAt: 'desc'
                },
                
                include: {
                  reactions: true
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
        },
        reactToMessage: async (_, { uuid, content }, { currentUser, pubsub }) => {
          const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']
    
          try {
            // Validate reaction content
            if (!reactions.includes(content)) {
              throw new UserInputError('Invalid reaction')
            }
    
            // Get user
            const username = currentUser ? currentUser.username : ''
            currentUser = await client.user.findUnique({ where: {username } })
            if (!currentUser) throw new AuthenticationError('Unauthenticated')
    
            // Get message
            const message = await client.message.findFirst({ where: { uuid } })
            if (!message) throw new UserInputError('message not found')
    
            if (message.from !== currentUser.username && message.to !== currentUser.username) {
              throw new ForbiddenError('Unauthorized')
            }
    
            let reaction = await client.reaction.findFirst({
              where: {
              AND:  [ {
                messageId: message.id
              },
              {
                userId: currentUser.id
              }
              ] }
            })
    
            if (reaction) {
              // Reaction exists, update it
                reaction = await client.reaction.update({
                where: { 
                  id: reaction.id
                },
                data: {
                  content
                },
                })
              } else {
                reaction = client.reaction.create({
                  data: {
                    messageId: message.id,
                    userId: currentUser.id,
                    content,
                  }
                })
              }

            pubsub.publish('NEW_REACTION', { newReaction: reaction })
            return reaction
          } catch (err) {
            throw err
          }
        },
    },

    Subscription: {
        newMessage: {
          subscribe: withFilter(
            (_, __, {  currentUser, pubsub }) => {
              if (!currentUser) throw new AuthenticationError('Unauthenticated')
              return pubsub.asyncIterator('NEW_MESSAGE')
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
          )},

        
        newReaction: {
          subscribe: withFilter(
            (_, __, { pubsub, currentUser }) => {
              if (!currentUser) throw new AuthenticationError('Unauthenticated')
              return pubsub.asyncIterator('NEW_REACTION')
            },
            async ({ newReaction }, _, { currentUser }) => {
              const { message } =  await client.reaction.findUnique({
                where: {
                  id: newReaction.id
                },
                include: {
                  message: true
                },
              })
              if (message.from === currentUser.username || message.to === currentUser.username) {
                return true
              }
              return false
            }
          ),
        },


      },
    }