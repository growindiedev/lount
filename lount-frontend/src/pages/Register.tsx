import React, {useState} from 'react'
import { useMutation } from '@apollo/client'
import { Link, useHistory } from 'react-router-dom'
import { BiUserCircle, BiBookHeart } from 'react-icons/bi'
import {FcLock} from 'react-icons/fc'
import { REGISTER_USER } from '../queries'
import {useFormik} from 'formik'
import {
	Input,
	Stack,
	InputGroup,
	InputLeftElement,
	Button,
	FormControl,
	Text,
} from '@chakra-ui/react';
import {register, registerVariables} from '../generated/register'



const Register = () => {

    interface formikValues{
        email: string,
        username: string,
        password: string,
        confirmPassword: string
    }

  const [errors, setErrors] = useState({})
  const history = useHistory()

    const [registerUser, { loading }] = useMutation<register, registerVariables>(REGISTER_USER, {
        update: (_, __) => history.push('/login'),
        onError: (err: any) => setErrors(err.graphQLErrors[0].extensions.errors),
    })

    const formik = useFormik<formikValues>({
        initialValues: {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        },
        onSubmit: async ({username, password, email, confirmPassword}, {resetForm}) => {
        
        try {
            await registerUser({variables: {email, username, password, confirmPassword}})
            resetForm()
        } catch (err) {
            console.log({error: err})
        }
        },
    })

     return (
        <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} bg="gray.200"
        w='350px'
        p={5}
        boxShadow='m'
        rounded='lg'>
          
          <FormControl isRequired >
            <InputGroup>
              <InputLeftElement children={<BiUserCircle/>} />
              <Input 
                type='text' name='username' 
                placeholder='username' 
                area-label='username' 
                onChange={formik.handleChange} 
                value={formik.values.username}
                bg='white'
                />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
                <InputGroup>
                    <InputLeftElement children={<BiBookHeart />} />
                    <Input
                    type='text'
                    name='email'
                    placeholder='Email'
                    aria-label='Email'
                    onChange={formik.handleChange} 
                    value={formik.values.email}
                    bg='white'
                    />
                </InputGroup>
            </FormControl>
          <FormControl isRequired >
            <InputGroup>
              <InputLeftElement children={<FcLock/>} />
              <Input
                type='password'
                placeholder='Password'
                aria-label='Password'
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                bg='white'
              />
            </InputGroup>
          </FormControl>
        <FormControl isRequired>
                <InputGroup>
                    <InputLeftElement children={<FcLock />} />
                    <Input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    aria-label='confirmPassword'
                    onChange={formik.handleChange} 
                    value={formik.values.confirmPassword}
                    bg='white'
                    />
                </InputGroup>
            </FormControl>
        
          <Button
            type='submit'
            boxShadow='sm'
            _hover={{ boxShadow: 'md' }}
            _active={{ boxShadow: 'lg' }}
            width="100"
            disabled={loading}
            >
            {loading ? 'loading..' : 'Register'}
          </Button>
          <Text fontSize="sm" textAlign="center" color="gray.400">Created by Jarryingnut 👨‍💻</Text>
          <Text>{loading ? 'loading..' : 'Register'}</Text>
        </Stack>
      </form>
      )
      
}

export default Register
