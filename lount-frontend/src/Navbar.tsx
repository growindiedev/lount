import React from 'react'
import { NavLink } from 'react-router-dom'
import {Flex, Box, Text, useToast, Image, Button, Spacer} from '@chakra-ui/react'
import { useAuthDispatch, useAuthState } from './context/auth'


const Navbar = () => {   

    const dispatch = useAuthDispatch()
    const state: any = useAuthState()
    const toast =  useToast()
  
    const  logout = async () => {
      await dispatch({ type: 'LOGOUT' }) 
     // window.location.href = '/login'
      toast({
        title: "See you again!",
        description: "You have logged out successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
    
if(!state?.user)
{
        return (
            <Flex  align="center" px="40"  bg="whiteAlpha.800" py="1.5" color="gray.600">
                <Box px="2">
                    <Image w='30px' src='/lountchat.png' alt='Logo' />
                </Box>
                <Box px="2"> 
                <Text size="sm" fontWeight="semibold" _hover={{ color: 'teal.400' }}><NavLink to="/login" >Login</NavLink></Text>
                </Box>
                <Box px="2"> 
                <Text size="sm" fontWeight="semibold" _hover={{ color: 'teal.400' }}><NavLink to="/register">Register</NavLink></Text>
                </Box>
            
            </Flex>

        )
} else  {
    
        return (
            <Flex  align="center" px="40"  bg="gray.200" py="0.5" color="gray.600" >
            <Box px="2">
                    <Image w='30px' src='/lountchat.png' alt='Logo' />
            </Box>
            <Spacer />

            <Flex  alignItems="center" >
                    
                    <Text size="sm" fontWeight="semibold" mr="5">{`${state?.user?.username} is logged in `}</Text>
                    <Button   _hover={{ color: 'teal.400' }} onClick={logout}  variant="outline" borderRadius="sm">Logout</Button>
            </Flex>
            
        </Flex>
        )
    }
}


export default Navbar



