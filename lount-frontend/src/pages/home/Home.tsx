
import React, {useEffect} from 'react'
import { useSubscription } from '@apollo/client'

import {Flex } from '@chakra-ui/react'
import Messages from './Messages'
import Users from './Users'
import { useAuthState } from '../../context/auth'
import { useMessageDispatch } from '../../context/message'
import { NEW_MESSAGE } from '../../queries'

export default function Home() {

  const messageDispatch = useMessageDispatch()
  const state: any = useAuthState()
  const user = state.user

  const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE )

  useEffect(() => {
    if (messageError) console.log(messageError)

    if (messageData) {
      const message = messageData.newMessage
      const otherUser = user.username === message.to ? message.from : message.to

      messageDispatch({
        type: 'ADD_MESSAGE',
        payload: {
          username: otherUser,
          message,
        },
      })
    }
  }, [messageError, messageData])
  

  return (
    <Flex  m="24"  bg="white.100" height="lg" >
      <Users />
      <Messages />
    </Flex>
  )
}