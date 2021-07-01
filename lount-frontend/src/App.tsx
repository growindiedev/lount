import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"
import ApolloProvider from './ApolloProvider'


import Home from './pages/home/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './Navbar'


import { AuthProvider } from './context/auth'
import { MessageProvider } from './context/message'
import theme from './theme'

import DynamicRoute from './util/DynamicRoute'


function App(): JSX.Element {
  return (
    <ApolloProvider>
    <ChakraProvider theme={theme}>
    <MessageProvider> 
    <AuthProvider> 
      <BrowserRouter>
      <Navbar/>
          <Switch>
              <DynamicRoute exact path="/" component={Home} authenticated/>
              <DynamicRoute path="/register" component={Register} guest/>
              <DynamicRoute path="/login" component={Login} guest/>
          </Switch>
      </BrowserRouter>
      </AuthProvider>
      </MessageProvider> 
    </ChakraProvider>
    </ApolloProvider>
  )
}


//npx apollo client:codegen --target typescript --endpoint=http://localhost:4000 --outputFlat --includes "{src/pages)/**" --excludes "src/generated" src/generated
export default App