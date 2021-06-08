import React, {useEffect, useState}  from 'react'
import {useFormik} from 'formik'
import { BiUserCircle } from 'react-icons/bi'
import {FcLock} from 'react-icons/fc'
import { useHistory } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { LOGIN_USER } from '../queries'

import {
	Input,
	Stack,
	InputGroup,
	InputLeftElement,
	Button,
	FormControl,
	Text,
	FormErrorMessage
} from '@chakra-ui/react';

const Login = () => {

	interface err {
		username: string,
		password: string
	}

	

	const history = useHistory()

	const [errors, setErrors] = useState<err | undefined>();
	const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
		onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
		onCompleted(data) {
		  localStorage.setItem('token', data.login.token)
		  history.push('/')
		},
	  })

	  const formik = useFormik<err>({
		initialValues: {
		  username: '',
		  password: ''
		},
		onSubmit: async ({username, password} , {resetForm}) => {
		  try {
			loginUser({variables: {username, password}})
			resetForm()
		  } catch (err) {
			console.error(err)
		  }
		},
	  });
    
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
								onChange={formik.handleChange}
								value={formik.values.username}
								area-label='username' 
								bg='white'
							/>
						</InputGroup>
						<FormErrorMessage>{errors?.username && errors?.username}</FormErrorMessage>
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
						<FormErrorMessage>{errors?.password && errors?.password}</FormErrorMessage>

					</FormControl>
					<Button
						type='submit'
						boxShadow='sm'
						_hover={{ boxShadow: 'md' }}
						_active={{ boxShadow: 'lg' }}
						  width="100"
						  disabled={loading}
						>
              		{loading ? 'loading..' : 'Login'}
					</Button>
					<Text fontSize="sm" textAlign="center" color="gray.400">Created by Jarryingnut 👨‍💻</Text>
				</Stack>
			</form>
	  )
}

export default Login
