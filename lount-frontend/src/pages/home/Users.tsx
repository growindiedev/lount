import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../queries'
import { useMessageDispatch, useMessageState } from '../../context/message'
import {getMessages} from '../../generated/getMessages'
import {getUsers_getUsers_latestMessage} from '../../generated/getUsers'
import {Box, VStack, Flex, Text, Avatar } from '@chakra-ui/react'



function Users(): ReactElement {

    type User = { 
        username: string;
        createdAt: string;
        token: string | null;
        imageUrl: string;
        messages: getMessages, 
        latestMessage: getUsers_getUsers_latestMessage
        selected: boolean
    }

    const dispatch = useMessageDispatch()
    const state: any = useMessageState()
    const users = state?.users
    const selectedUser = users?.find((u: User) => u.selected === true)?.username

    const { loading } = useQuery(GET_USERS, {
        onError: (err) => console.log(err),
        onCompleted: (data) =>  dispatch({ type: 'SET_USERS', payload: data.getUsers })
      })


    let usersMarkup
  if (!users || loading) {
    usersMarkup = <p>Loading..</p>
  } else if (users.length === 0) {
    usersMarkup = <p>No users have joined yet</p>
  } else if (users.length > 0) {
    usersMarkup = users.map((user: User) => {
      const selected = selectedUser === user.username
      return (
        <Flex
          p="3"  
          key={user.username}
          _hover={{ bgColor: selected && 'grey.200' }}
          onClick={() =>
            dispatch({ type: 'SET_SELECTED_USER', payload: user.username })
            
          }
        >
          <Avatar
            src={user.imageUrl}
            mr="2"
          />
          <Box>
            <Text >{user.username}</Text>
            <Text fontWeight="medium">
              {user.latestMessage
                ? user.latestMessage.content
                : 'You are now connected!'}
            </Text>
          </Box>
        </Flex>
      )
    })
  }
  return (
    <VStack p="0" bgColor="aqua" >
      {usersMarkup}
    </VStack>
  )
}



export default Users
