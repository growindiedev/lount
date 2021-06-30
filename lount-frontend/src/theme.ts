import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"
// Version 1: Using objects
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