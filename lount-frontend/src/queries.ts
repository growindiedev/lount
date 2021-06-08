import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`

export const REGISTER_USER = gql`
mutation register(
  $username: String!
  $email: String!
  $password: String!
  $confirmPassword: String!
) {
  register(
    username: $username
    email: $email
    password: $password
    confirmPassword: $confirmPassword
  ) {
    username
    email
    createdAt
  }
}
`