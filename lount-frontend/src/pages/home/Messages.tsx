import React, { ReactElement, useEffect } from 'react'
import {  useLazyQuery, useMutation } from '@apollo/client'
import { GET_MESSAGES, SEND_MESSAGE } from '../../queries'
import {getMessages} from '../../generated/getMessages'

import {  Input, InputGroup, InputRightElement, VStack, Text, chakra} from '@chakra-ui/react'
import { useMessageDispatch, useMessageState } from '../../context/message'
import Message from './Message'
import { useFormik } from 'formik';
import {IoSend} from 'react-icons/io5'
import classNames from 'classnames'


function Messages(): ReactElement {

    type User = { username: string, messages: getMessages, selected: boolean}
    type Message = {
        uuid: string,
        from: string,
        to: string,
        content: string,
        createdAt: string
        reactions: any
    }
    
    const state: any = useMessageState()
    const dispatch = useMessageDispatch()
    const selectedUser = state?.users?.find((u: User) => u.selected === true)
    const messages = selectedUser?.messages

    const [ getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES)
    const [sendMessage] = useMutation(SEND_MESSAGE, { onError: (err) => console.log(err) })


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

    const formik = useFormik({
      initialValues: {
        messageContent: '',
      },
      onSubmit: async ({messageContent}, {resetForm}) => {
        if (messageContent.trim() === '' || !selectedUser) return
        await sendMessage({ variables: { to: selectedUser?.username, content: messageContent } })
        resetForm()
      },
    });


      let selectedChatMarkup, inputMarkup, selectAFriend
      
      if (!messages && !messagesLoading) {
        selectedChatMarkup = <Text fontWeight="light" color="gray.500">Select a friend</Text>
        selectAFriend = true
      } else if (messagesLoading) {
        selectedChatMarkup = <p>Loading..</p>
      } else if (messages.length > 0) {
        selectedChatMarkup = messages.map((message: Message) => (
          <Message message={message} key={message.uuid}/>
        ))
      } else if (messages.length === 0) {
        inputMarkup = <p>You are now connected! send your first message!</p>
      }

    return (
      <VStack width="70%" justifyContent="flex-start" bgColor="whiteAlpha.900" >
        <VStack  overflowY="scroll" width="100%" height="90%" flexDirection="column-reverse">
            {selectedChatMarkup}
        </VStack>
        {/* <Box width="100%" > */}
            <chakra.form width="100%" onSubmit={formik.handleSubmit} mt="10px">
            <InputGroup  mx="5" mb="2" height="10%" width="95%" isDisabled={selectAFriend} >
            <InputRightElement children={<IoSend/>} as="button" type="submit" fontSize="xl" />
						<Input 
								type='text' name='messageContent'
								onChange={formik.handleChange}
								value={formik.values.messageContent}
								area-label='messageContent' 
                placeholder={classNames({
                  'You are now connected! send your first message!': inputMarkup
                })}
								bg='gray.100'
                focusBorderColor="none"
                borderColor="gray.50"
                isDisabled={selectAFriend}
							/>
						</InputGroup>
            </chakra.form>
        {/* </Box> */}
        </VStack>
    )
}

export default Messages
