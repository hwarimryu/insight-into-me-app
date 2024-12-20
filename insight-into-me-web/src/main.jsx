import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
import { registerSW } from "virtual:pwa-register";
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.ts';

registerSW();

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme= {theme}>
    <App />
  </ChakraProvider>
)
