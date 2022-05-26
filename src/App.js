import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import {Global,css} from '@emotion/react'
import '@fontsource/poppins';
import theme from './utils/theme'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // useQuery,
  // gql
  makeVar 
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

export const fetchUserVar = makeVar({}); 

const client = new ApolloClient({
  uri:process.env.REACT_APP_API_URL,
  cache: new InMemoryCache({
    Query:{
      field:{
        fetchUser:{
           read() {
              return fetchUserVar()
           }
        }
      }
    }
  })
});

function App() {
  return (
    <HelmetProvider>
      <ApolloProvider client={client}>
          <ChakraProvider theme={theme} >
                <GlobalStyle>
                    <AppRoutes/>
                </GlobalStyle>  
          </ChakraProvider>
      </ApolloProvider>
    </HelmetProvider> 
    
  );
}

export default App;
