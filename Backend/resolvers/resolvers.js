const { PrismaClient, Prisma } = require('@prisma/client')
const { ApolloServer, gql, UserInputError, AuthenticationError} = require('apollo-server')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = {
    Query: {
      getUsers: async () => {
        try {
          const users = await prisma.user.findMany();
  
          return users;
        } catch (err) {
          console.log(err);
        }
      },

      login: async (_, {username, password}) => {
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
            throw new AuthenticationError('password is incorrect', { errors })
          }
  
          const token = jwt.sign({ username }, process.env.SECRET, {
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
      register: async(_, args) => {
        let { username, email, password, confirmPassword } = args
        let errors = {}

        try {
          // Validate input data
          if (email.trim() === '') errors.email = 'email must not be empty'
          if (username.trim() === '')
            errors.username = 'username must not be empty'
          if (password.trim() === '')
            errors.password = 'password must not be empty'
          if (confirmPassword.trim() === '')
            errors.confirmPassword = 'repeat password must not be empty'
  
          if (password !== confirmPassword)
            errors.confirmPassword = 'passwords must match'
  
          if (Object.keys(errors).length > 0) {
            throw errors
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
            console.log("unique constraint error")
          } else if (e instanceof Prisma.PrismaClientValidationError){
            console.log("missing arguments")
          }
          throw e;

        }

      }
    }
  };