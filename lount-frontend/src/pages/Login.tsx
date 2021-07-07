import React, { useState }  from 'react'
import {useFormik} from 'formik'
import { BiUserCircle } from 'react-icons/bi'
import {FcLock} from 'react-icons/fc'
import { useLazyQuery } from '@apollo/client'
import { LOGIN_USER } from '../queries'
import { login, loginVariables } from '../generated/login'
import { useAuthDispatch } from '../context/auth'
import {
	VStack, 
	Input,
	Stack,
	InputGroup,
	InputLeftElement,
	Button,
	FormControl,
	Text,
	FormLabel,
	Image,
	useToast
} from '@chakra-ui/react';

const Login = () => {

	
	const dispatch = useAuthDispatch()
	const toast = useToast()

	const [errors, setErrors] = useState<loginVariables | undefined>();
	const [loginUser, { loading }] = useLazyQuery<login, loginVariables>(LOGIN_USER, {
		onError: (err: any) => {
			toast({
				title: "Authentication Error",
				position: "bottom-right",
				description: "Check your credentials",
				status: "error",
				duration: 3000,
				isClosable: true,
			  })
			  setErrors(err.graphQLErrors[0].extensions.errors)
		},
		onCompleted: async ({login}) => {
			await dispatch({ type: 'LOGIN', payload: login })
			window.location.href = '/'
		},
		
	  })

	  const formik = useFormik<loginVariables>({
		initialValues: {
		  username: '',
		  password: ''
		},

		onSubmit: async ({username, password} , {resetForm}) => {
		  try {
			await loginUser({variables: {username, password}})
			resetForm()
		  } catch (err) {
			console.error(err)
		  }
		},
	  });
    
     return (
		<VStack spacing="10" p="10" margin="20">
		<form onSubmit={formik.handleSubmit}>
				<Stack spacing={5} bg="orange.100"
				w='350px'
				p={5}
				boxShadow='m'
				rounded='lg'>

					<FormControl isRequired >
					<Image src="LountWithText.png" mx='auto' mt={12} mb={10} width="30%" />
						
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
						bg="orange.200"
						color="orange.500"
						disabled={loading}
					>
              		{loading ? 'loading..' : 'Login'}
					</Button>
					<Text fontSize="sm" textAlign="center" color="teal.400">Created by Jarryingnut 👨‍💻 </Text>
				</Stack>
			</form>
			</VStack>
	  )
}

export default Login