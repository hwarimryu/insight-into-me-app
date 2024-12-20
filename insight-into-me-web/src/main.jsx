import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme= {theme}>
    <App />
  </ChakraProvider>
)
