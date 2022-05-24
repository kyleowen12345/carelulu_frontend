import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {Global,css} from '@emotion/react'
import '@fontsource/poppins';
import theme from './utils/theme'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // useQuery,
  // gql
} from "@apollo/client";
import AppRoutes from './routes';

const GlobalStyle = ({ children }) => {
  return (
    <>

      <Global
        styles={css`
          body{
            background-color: white;
            scroll-behavior: smooth;
            font-family:Poppins
          }
        `}
      />
      {children}
    </>
  );
};

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
        <ChakraProvider theme={theme} >
              <GlobalStyle>
                  <AppRoutes/>
              </GlobalStyle>  
        </ChakraProvider>
    </ApolloProvider> 
    
  );
}

export default App;
