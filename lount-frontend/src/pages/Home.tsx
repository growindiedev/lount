
import React, {useEffect, useState}  from 'react'
import { useHistory, NavLink} from 'react-router-dom'
import { useAuthDispatch } from '../context/auth'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_USERS, GET_MESSAGES } from '../queries'
import {Box, HStack,VStack, Flex, Text, Avatar } from '@chakra-ui/react'
import { getUsers, getUsers_getUsers} from '../generated/getUsers'


export default function Home() {
  const history = useHistory()
  const [selectedUser, setSelectedUser] = useState<any>(null)


  
  const { loading, data, error } = useQuery<getUsers, getUsers_getUsers>(GET_USERS)
  const [ getMessages, { loading: messagesLoading, data: messagesData }, ] = useLazyQuery(GET_MESSAGES)

  if (data) {
    console.log(data)
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } })
    }
  }, [selectedUser, data])

  if (messagesData) console.log(messagesData.getMessages)

  let usersMarkup

  if (!data || loading ) {
    usersMarkup = <p>Loading..</p>
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user, i) => (
      <Box key={i} as="button" onClick={() => setSelectedUser(user?.username)}>
        <Flex p="3">
          <Avatar src={user?.imageUrl} m="2"/>
          <div>
            <Text>{user?.username}</Text>
            <Text>
              {user?.latestMessage ? user.latestMessage.content: 'you are now connected'}
            </Text>
          </div>
        </Flex>
      </Box>
    ))
  }

// const AuthDispatchContext = createContext<Dispatch | any>(undefined)


  return (
    <>   
    {/* <Flex  align="center" px="40"  bg="gray.200" py="1.5" color="gray.600" >
        
        <Box px="2"> 
        <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }}><NavLink to="/login" >login</NavLink></Text>
        </Box>
        <Box px="2"> 
        <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }}><NavLink to="/register">register</NavLink></Text>
        </Box>
        <Box px="2"> 
        <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }} as="button" onClick={logout}>Logout</Text>
        </Box>   

    </Flex> */}
    <HStack>
      <VStack>{usersMarkup}</VStack>
      <Box>
          {messagesData && messagesData.getMessages.length > 0 ? (
            messagesData.getMessages.map((message: { uuid: React.Key | null | undefined; content: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => (
              <p key={message.uuid}>{message.content}</p>
            ))
          ) : (
            <p>Messages</p>
          )}
      </Box>
    </HStack>

    </>
)
}