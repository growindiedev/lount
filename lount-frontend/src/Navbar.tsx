import React from 'react'
import { NavLink } from 'react-router-dom'
import {Flex, Box, Text} from '@chakra-ui/react'
import { useAuthDispatch, useAuthState } from './context/auth'


const Navbar = () => {   

    const dispatch = useAuthDispatch()
    const state: any = useAuthState()
  
    const  logout = async () => {
      await dispatch({ type: 'LOGOUT' }) 
      window.location.href = '/login'
    }
    
if(!state?.user)
{
        return (
            <Flex  align="center" px="40"  bg="gray.200" py="1.5" color="gray.600">
                <Box px="2"> 
                <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }}><NavLink to="/login" >Login</NavLink></Text>
                </Box>
                <Box px="2"> 
                <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }}><NavLink to="/register">Register</NavLink></Text>
                </Box>
            
            </Flex>

        )
} else  {
    
        return (
        <Flex align="center" px="20"  bg="gray.200" py="1.5">
            <Box px="2"> 
                <Text size="sm" fontWeight="semibold" _hover={{ color: 'orange.400' }} as="button" onClick={logout}>Logout</Text>
            </Box>
        </Flex>
        )
    }
}


export default Navbar



