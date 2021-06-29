
import React from 'react'

import {HStack } from '@chakra-ui/react'
import Messages from './Messages'
import Users from './Users'

export default function Home() {
  
// const AuthDispatchContext = createContext<Dispatch | any>(undefined)

  return (
    <HStack>
      <Users />
      <Messages />
    </HStack>
  )
}