import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../queries'
import { useMessageDispatch, useMessageState } from '../../context/message'
import {getMessages} from '../../generated/getMessages'
import {getUsers_getUsers_latestMessage} from '../../generated/getUsers'
import {VStack, Flex, Text, Avatar } from '@chakra-ui/react'
import classNames from 'classnames'



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
        width="100%"
        as="button"
        key={user.username}
        p="3"
        justifyContent="flex-start"
        _hover={{ bg:  'gray.200' }}
        onClick={() => dispatch({ type: 'SET_SELECTED_USER', payload: user.username })}
        bg={classNames({'gray.200': selected})}
        >
          <Avatar
            src={user.imageUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
            mx="3"
            size="md"
          />
          <VStack alignItems="flex-start" isTruncated >
            <Text fontSize="md">{user.username}</Text>
            <Text fontWeight="thin" fontSize="sm" >
              {user.latestMessage
                ? user.latestMessage.content
                : 'You are now connected!'}
            </Text>
          </VStack>
        </Flex>
      )
    })
  }
  return (
    <VStack  bgColor="gray.100" width="30%" overflowY="scroll" >
      {usersMarkup}
    </VStack>
  )
}



export default Users
