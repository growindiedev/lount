
import React, {useEffect} from 'react'
import { useSubscription } from '@apollo/client'
import {Flex } from '@chakra-ui/react'
import Messages from './Messages'
import Users from './Users'
import { useAuthState } from '../../context/auth'
import { useMessageDispatch } from '../../context/message'
import { NEW_MESSAGE, NEW_REACTION } from '../../queries'

export default function Home() {

  const messageDispatch = useMessageDispatch()
  const state: any = useAuthState()
  const user = state.user

  const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE )
  const { data: reactionData, error: reactionError } = useSubscription(NEW_REACTION)


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

  useEffect(() => {
    if (reactionError) console.log(reactionError)

    if(reactionData){
      const reaction = reactionData.newReaction
      const otherUser = user.username === reaction.message.to ? reaction.message.from : reaction.message.to
      messageDispatch({
        type: 'ADD_REACTION',
        payload: {
          username: otherUser,
          reaction,
        },
      })
    }
  }, [reactionError, reactionData])

  return (
    <Flex  m="24"  bg="white.100" height="lg" >
      <Users />
      <Messages />
    </Flex>
  )
}