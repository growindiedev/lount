
import React from 'react'

import {Flex } from '@chakra-ui/react'
import Messages from './Messages'
import Users from './Users'

export default function Home() {
  

  return (
    <Flex  m="16"  bg="white.100" height="xl" >
      <Users />
      <Messages />
    </Flex>
  )
}