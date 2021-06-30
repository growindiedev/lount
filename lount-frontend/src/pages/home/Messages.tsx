import React, { ReactElement, useEffect } from 'react'
import {  useLazyQuery } from '@apollo/client'
import { GET_MESSAGES } from '../../queries'
import {getMessages} from '../../generated/getMessages'
import {  VStack } from '@chakra-ui/react'
import { useMessageDispatch, useMessageState } from '../../context/message'
import Message from './Message'

function Messages(): ReactElement {

    type User = { username: string, messages: getMessages, selected: boolean}
    type Message = {
        uuid: string,
        from: string,
        to: string,
        content: string,
        createdAt: string
    }
    
    const state: any = useMessageState()
    // const users = state?.users
    // const { users = 'no users' }: any = useMessageState()

    const dispatch = useMessageDispatch()
    const selectedUser = state?.users?.find((u: User) => u.selected === true)
    const messages = selectedUser?.messages

    const [ getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES)

    useEffect(() => {
        if (selectedUser && !selectedUser.messages) {
          getMessages({ variables: { from: selectedUser.username } })
        }
      }, [selectedUser])

    useEffect(() => {
        if(messagesData){
            dispatch({
                type: 'SET_USER_MESSAGES',
                payload: {
                  username: selectedUser?.username,
                  messages: messagesData.getMessages,
                },
              })
            }
    }, [messagesData])


      let selectedChatMarkup
      if (!messages && !messagesLoading) {
        selectedChatMarkup = <p>Select a friend</p>
      } else if (messagesLoading) {
        selectedChatMarkup = <p>Loading..</p>
      } else if (messages.length > 0) {
        selectedChatMarkup = messages.map((message: Message) => (
          <Message message={message} key={message.uuid}/>
        ))
      } else if (messages.length === 0) {
        selectedChatMarkup = <p>You are now connected! send your first message!</p>
      }


    return (
        <VStack width="70%" bgColor="whiteAlpha.900" alignItems="flex-start" overflowY="scroll" >
            {selectedChatMarkup}
        </VStack>
    )
}

export default Messages
