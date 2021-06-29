import React, { createContext, useReducer, useContext } from 'react'
import {getMessages} from '../generated/getMessages'
//import {getUsers, getUsers_getUsers} from '../generated/getUsers'


type Action = {type: 'SET_USERS', payload: {users: any}} | {type: 'SET_USER_MESSAGES', payload: {username: string, messages: getMessages}} | {type: 'SET_SELECTED_USER', payload: string}
type Dispatch = (action: Action) => void
type AuthProviderProps = {children: React.ReactNode}
type User = { username: string, messages: getMessages, selected: boolean}
type State = { users: User[]}

const MessageStateContext = createContext<{ state: State ; dispatch: Dispatch } | undefined>(undefined)
const MessageDispatchContext = createContext<Dispatch | any>(undefined)


const messageReducer = (state: any , action: Action) => {
  let usersCopy
    switch (action.type) {
      case 'SET_USERS':
        
      return {
        ...state,
        users: action.payload,
      }
    case 'SET_USER_MESSAGES':
      const { username, messages } = action.payload
      usersCopy = [...state.users]

      const userIndex = usersCopy.findIndex((u) => u.username === username)

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
