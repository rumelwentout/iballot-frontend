import React from 'react';
import { ChakraProvider,extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.css';

const theme = extendTheme({
  colors: {
    primary: {
      100: '#d4e0fb',
      200: '#afc6f7',
      300: '#81a5f3',
      400: '#6692f0',
      500: '#2563EA',
      600: '#2460e2',
      700: '#1d4db6',
      800: '#18419a',
      900: '#122f70'
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
