import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { ChakraProvider, Box, VStack } from "@chakra-ui/react"
import ApolloProvider from './ApolloProvider'


import Home from './pages/home/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './Navbar'


import { AuthProvider } from './context/auth'
import { MessageProvider } from './context/message'

import DynamicRoute from './util/DynamicRoute'


function App(): JSX.Element {
  return (
    <ApolloProvider>
    <ChakraProvider>
    <MessageProvider> 
    <AuthProvider> 
      <BrowserRouter>
      <Navbar/>
      <VStack spacing="5" p="10">
        <Box pt="5">
          <Switch>
            <DynamicRoute exact path="/" component={Home} authenticated/>
            <DynamicRoute path="/register" component={Register} guest/>
            <DynamicRoute path="/login" component={Login} guest/>
          </Switch>
        </Box>
        </VStack>
      </BrowserRouter>
      </AuthProvider>
      </MessageProvider> 
    </ChakraProvider>
    </ApolloProvider>
  )
}


//npx apollo client:codegen --target typescript --endpoint=http://localhost:4000 --outputFlat --includes "{src/pages)/**" --excludes "src/generated" src/generated
export default App