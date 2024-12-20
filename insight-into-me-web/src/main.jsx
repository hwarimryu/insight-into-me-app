import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.ts';

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme= {theme}>
    <App />
  </ChakraProvider>
)
