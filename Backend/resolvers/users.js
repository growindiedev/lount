const { PrismaClient, Prisma } = require('@prisma/client')
const { ApolloServer, gql, UserInputError, AuthenticationError} = require('apollo-server')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()



module.exports = {
    Query: {
      getUsers: async (root, args, context) => {
        
        try {
          const currentUser = await context.currentUser
          if (!currentUser) {
            throw new AuthenticationError("not authenticated")
          }
          const users = await prisma.user.findMany({
            where: {
              NOT: {
                username: currentUser.username
              }
            }
          });
          return users;
        } catch (err) {
          console.log(err);
        }
      },

      login: async (root, {username, password}) => {
        let errors = {}

        try {
          if (username.trim() === '')
            errors.username = 'username must not be empty'
          if (password === '') errors.password = 'password must not be empty'
  
          if (Object.keys(errors).length > 0) {
            throw new UserInputError('bad input', { errors })
          }
  
          const user = await prisma.user.findUnique({
            where: { username },
          })
  
          if (!user) {
            errors.username = 'user not found'
            throw new UserInputError('user not found', { errors })
          }
  
          const correctPassword = await bcrypt.compare(password, user.password)
  
          if (!correctPassword) {
            errors.password = 'password is incorrect'
            throw new UserInputError('password is incorrect', { errors })
          }

          const userForToken = {
            username: user.username,
            id: user.id
          }
  
          const token = jwt.sign( userForToken, process.env.SECRET, {
            expiresIn: 60 * 60,
          })
  
          return {
            ...user,
            createdAt: user.createdAt.toISOString(),
            token,
          }
        } catch (err) {
          console.log(err)
          throw err
        }
        },
      
    },

    Mutation: {
      register: async(root, args) => {
        let { username, email, password, confirmPassword } = args
        let errors = {}

        try {
          // Validate input data
          if (email.trim() === '') errors.email = 'email must not be empty'
          
          if (Object.keys(errors).length > 0) {
            throw new UserInputError('email must not be empty', { errors })
          }

          if (username.trim() === '')
            errors.username = 'username must not be empty'
          
            if (Object.keys(errors).length > 0) {
              throw new UserInputError('username must not be empty', { errors })
            }
          if (password.trim() === '')
            errors.password = 'password must not be empty'

            if (Object.keys(errors).length > 0) {
              throw new UserInputError('password must not be empty', { errors })
            }

          if (confirmPassword.trim() === '')
            errors.confirmPassword = 'repeat password must not be empty'
          
            if (Object.keys(errors).length > 0) {
              throw new UserInputError('repeat password must not be empty', { errors })
            }
  
          if (password !== confirmPassword)
            errors.confirmPassword = 'passwords must match'
  
            if (Object.keys(errors).length > 0) {
              throw new UserInputError('passwords must match', { errors })
            }
          const passwordHash = await bcrypt.hash(password, 10)
          const newUser = await prisma.user.create({
            data: {
              username, email, password: passwordHash
            }
          })

          return newUser;

        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') 
              errors[e.code] = 'There is a unique constraint violation, a new user cannot be created with this email'
            
            if (Object.keys(errors).length > 0) {
              throw new UserInputError('P2002', { errors })
            }
  
          } else if (e instanceof Prisma.PrismaClientValidationError){
            if (e.code === 'P2013') 
              errors[e.code] = 'required arguments are missing'
            
            if (Object.keys(errors).length > 0) {
              throw new UserInputError('P2013', { errors })
            }
          }
          throw e;
          
        }

      }
    }
  };