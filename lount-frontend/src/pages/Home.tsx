
import React  from 'react'
import { useHistory, NavLink} from 'react-router-dom'
import { useAuthDispatch } from '../context/auth'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../queries'
import {Box, Text, Flex, VStack } from '@chakra-ui/react'
import { getUsers, getUsers_getUsers} from '../generated/getUsers'


export default function Home() {
  const history = useHistory()
  const dispatch = useAuthDispatch()

  

  const logout = () => {
    dispatch({ type: 'LOGOUT' }) 
    history.push('/login')
  }
  
  const { loading, data } = useQuery<getUsers, getUsers_getUsers>(GET_USERS)

  if (data) {
    console.log(data)
  }

  let usersMarkup

  if (!data || loading) {
    usersMarkup = <p>Loading..</p>
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user, i) => (
      <div key={i}>
        <p>{user?.username}</p>
      </div>
    ))
  }

// const AuthDispatchContext = createContext<Dispatch | any>(undefined)


  return (
    <>   
    <Flex  align="center" px="40"  bg="gray.200" py="1.5" color="gray.600" >
        
        <Box px="2"> 
        <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }}><NavLink to="/login" >login</NavLink></Text>
        </Box>
        <Box px="2"> 
        <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }}><NavLink to="/register">register</NavLink></Text>
        </Box>
        <Box px="2"> 
        <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }} as="button" onClick={logout}>Logout</Text>
        </Box>   

    </Flex>
    <VStack>
      <Box>{usersMarkup}</Box>
      <Box>Messages</Box>
    </VStack>

    </>
)
}