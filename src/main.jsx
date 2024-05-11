import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.css';

window.global = window;

const pallets = {
  primaryBlue: {
    100: '#d4e0fb',
    200: '#afc6f7',
    300: '#81a5f3',
    400: '#6692f0',
    500: '#2563EA',
    600: '#2460e2',
    700: '#1d4db6',
    800: '#18419a',
    900: '#122f70'
  },
  primaryBlack: {
    50: '#E6E6E6',
    100: '#CCCCCC',
    200: '#B3B3B3',
    300: '#999999',
    400: '#808080',
    500: '#000000',
    600: '#333333',
    700: '#666666',
    800: '#999999',
    900: '#CCCCCC'
  },
  primaryOlive: {
    50: '#f6f8f5',
    100: '#dde2d7',
    200: '#c0c9b4',
    300: '#9eaa8a',
    400: '#8a9a73',
    500: '#728358',
    600: '#606e4a',
    700: '#4d593b',
    800: '#414b32',
    900: '#2f3624'
  }
};

const theme = extendTheme({
  colors: { primary: pallets.primaryBlack }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
