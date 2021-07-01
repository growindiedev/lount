import React, { createContext, useReducer, useContext } from 'react'
import {getMessages} from '../generated/getMessages'
//import {getUsers, getUsers_getUsers} from '../generated/getUsers'
type Message_ = {
  uuid: string,
  from: string,
  to: string,
  content: string,
  createdAt: string
}

//type Action = {type: 'SET_USERS', payload: {users: { username: string, message: Message_, messages: getMessages }}} | {type: 'SET_USER_MESSAGES', payload: {username: string, messages: getMessages}} | {type: 'SET_SELECTED_USER', payload: string} | {type: 'ADD_MESSAGE', payload: any}
type Action = {type: 'SET_USERS' | 'SET_USER_MESSAGES' | 'SET_SELECTED_USER' | 'ADD_MESSAGE', payload: { username?: string, message?: Message_,  messages?: getMessages}} 

type Dispatch = (action: Action ) => void
type AuthProviderProps = {children: React.ReactNode}
type User = { username: string, messages: getMessages, selected: boolean}
type State = { users: User[]}

const MessageStateContext = createContext<{ state: State ; dispatch: Dispatch } | undefined>(undefined)
const MessageDispatchContext = createContext<Dispatch | any>(undefined)


const messageReducer = (state: any , action: Action) => {
  let usersCopy, userIndex

  const { username, message, messages } = action.payload

    switch (action.type) {
      case 'SET_USERS':
        
      return {
        ...state,
        users: action.payload,
      }

    case 'SET_USER_MESSAGES':
      //const { username, messages } = action.payload
      usersCopy = [...state.users]
      userIndex = usersCopy.findIndex((u) => u.username === username)
      usersCopy[userIndex] = { ...usersCopy[userIndex], messages }

      return {
        ...state,
        users: usersCopy,
      }

    case 'SET_SELECTED_USER':
      usersCopy = state.users.map((user: {username: string}) => ({
        ...user,
        selected: user.username === action.payload,
      }))

      return {
        ...state,
        users: usersCopy,
      }

    case 'ADD_MESSAGE':
        usersCopy = [...state.users]
        userIndex = usersCopy.findIndex((u) => u.username === username)
  
        let newUser = {
          ...usersCopy[userIndex],
          messages: usersCopy[userIndex].messages
            ? [message, ...usersCopy[userIndex].messages]
            : null,
          latestMessage: message,
        }
        usersCopy[userIndex] = newUser
        return {
          ...state,
          users: usersCopy,
        }

    default:
      throw new Error(`Unknown action type`)
  }
}


export const MessageProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null })

  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  )
}

export const useMessageState = () => useContext(MessageStateContext)
export const useMessageDispatch = () => useContext(MessageDispatchContext)
