import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bgGradient: "linear(to-r, #74ebd5, #ACB6E5)",
      },
     
    },
  },
})

export default theme