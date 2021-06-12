import React, { useState}  from 'react'
import {useFormik} from 'formik'
import { BiUserCircle } from 'react-icons/bi'
import {FcLock} from 'react-icons/fc'
import { useHistory, Link } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { LOGIN_USER } from '../queries'
import { loginVariables, login_login} from '../generated/login'

import {
	Input,
	Stack,
	InputGroup,
	InputLeftElement,
	Button,
	FormControl,
	Text,
	FormLabel
} from '@chakra-ui/react';

const Login = () => {

	interface err {
		username: string,
		password: string
	}

	

	const history = useHistory()

	const [errors, setErrors] = useState<err | undefined>();
	const [loginUser, { loading }] = useLazyQuery<login_login, loginVariables>(LOGIN_USER, {
		onError: (err: any) => setErrors(err.graphQLErrors[0].extensions.errors),
		onCompleted: ({login: { token }}) => {
		  localStorage.setItem('chat-token', token)
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
								placeholder='Username'
								onChange={formik.handleChange}
								value={formik.values.username}
								area-label='username' 
								bg='white'
								borderColor={errors?.username ? 'red.400': 'whiteAlpha.200'}
							/>
						</InputGroup>
						{errors?.username && <FormLabel color="red.400" fontSize="xs">{errors?.username}</FormLabel>}
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
								borderColor={errors?.password ? 'red.400': 'whiteAlpha.200'}
							/>
						</InputGroup>
						{errors?.password && <FormLabel color="red.400" fontSize="xs">{errors?.password}</FormLabel>}

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
					<Text fontSize="sm" textAlign="center" color="gray.500">Created by Jarryingnut 👨‍💻 <br/> Not registered ? <Link to="/register"> <br/> Register</Link>
</Text>
				</Stack>
			</form>
	  )
}

export default Login
