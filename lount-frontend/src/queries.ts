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
  $imageUrl: String
) {
  register(
    username: $username
    email: $email
    password: $password
    confirmPassword: $confirmPassword
    imageUrl: $imageUrl
  ) {
    username
    email
    createdAt
  }
}
`

export const GET_USERS = gql`
query getUsers {
  getUsers {
    username
    createdAt
    token
    imageUrl
    latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
  }
}
`

export const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`

export const REACT_TO_MESSAGE = gql`
  mutation reactToMessage($uuid: String!, $content: String!) {
    reactToMessage(uuid: $uuid, content: $content) {
      uuid
    }
  }
`

export const NEW_MESSAGE = gql`
subscription newMessage {
  newMessage {
    uuid
    from
    to
    content
    createdAt
  }
}
`

export const NEW_REACTION = gql`
subscription newReaction {
  newReaction {
    uuid
    content
    message {
      uuid
      from
      to
    }
  }
}
`