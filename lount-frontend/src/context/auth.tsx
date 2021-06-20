import React, { createContext, useReducer, useContext } from 'react'
import jwtDecode from 'jwt-decode';


type Action = {type: 'LOGIN', payload: {token: string}} | {type: 'LOGOUT'}
type Dispatch = (action: Action) => void
type User = {username?: string, id?: string, exp?: number } | null


type AuthProviderProps = {children: React.ReactNode}

const AuthStateContext = createContext<{ state: { user: User} ; dispatch: Dispatch } | undefined>(undefined)
const AuthDispatchContext = createContext<Dispatch | any>(undefined)


let user: User 
const token = localStorage.getItem('chat-token')


if(token) {
    const decodedToken: { exp: number, username: string, id: string  } = jwtDecode(token) 
    const expiresAt = new Date(decodedToken.exp * 1000)

    if (new Date() > expiresAt) {
        localStorage.removeItem('chat-token')
      } else {
        user = decodedToken && decodedToken
      }
    } else console.log('No token found')


const authReducer = (state: any, action: Action) => {

    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('chat-token', action.payload.token)
        return {
          ...state,
          user: action.payload,
        }
      case 'LOGOUT':
        localStorage.removeItem('chat-token')
        return {
          ...state,
          user: null,
        }
      default:
        throw new Error(`Unknown action type`)
      }
  }

    export const AuthProvider = ({ children }: AuthProviderProps) => {
      const [state, dispatch] = useReducer(authReducer, { user })
    
      
    return (
      <AuthDispatchContext.Provider value={dispatch}>
        <AuthStateContext.Provider value={state}>
          {children}
        </AuthStateContext.Provider>
      </AuthDispatchContext.Provider>
    )
  }

   
export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext) 

