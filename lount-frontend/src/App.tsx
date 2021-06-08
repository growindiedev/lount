import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ChakraProvider, Box } from "@chakra-ui/react"

import ApolloProvider from './ApolloProvider'


import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

function App(): JSX.Element {
  return (
    <ApolloProvider>
    <ChakraProvider>
      <BrowserRouter>
        <Box pt="5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
    </ApolloProvider>
  )
}


//npx apollo client:codegen --target typescript --endpoint=http://localhost:4000 --outputFlat --includes "{src/pages)/**" --excludes "src/generated" src/generated
export default App