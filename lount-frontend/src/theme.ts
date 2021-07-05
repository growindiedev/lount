import { extendTheme } from "@chakra-ui/react"


// const IconButton = {
//   baseStyle: {
//     width: "2px"
//   }
// }

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bgGradient: "linear(to-r, #74ebd5, #ACB6E5)",
      },
      
    },
  },

  // components: {
  //   IconButton,
  // },
})

export default theme