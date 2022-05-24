import React from 'react'
import { Link as RouterLink  } from "react-router-dom";
import careluluhome from '../assests/images/careluluhome.jpg'

import {
  Box,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';

const Home = () => {
  return (
     <Box 
       minH={"90vh"}
       backgroundImage={careluluhome}
       backgroundSize={'cover'}
       backgroundPosition="50%"
       display={"flex"}
       justifyContent="center"
       alignItems={"center"}
       flexDirection="column"
       >
          <Heading 
          fontSize={'4xl'} 
          textAlign={'center'}
          color="white"
          textShadow={"3px 2px black"}
          fontWeight="medium"
          >
            Create your task with steps today.. </Heading>
          <Text 
            textShadow={"3px 2px black"}
            fontSize={'lg'}
            color="white"
            mt={3}
          >
            Manage your tasks now 📝
          </Text>
          <Box
             mt={10}
             display="flex"
             flexDirection={["column","column","column","row"]}
          >
            <RouterLink to="/dashboard">
                <Button
                    bg={'myTeal.100'}
                    color={'white'}
                    fontSize="18px"
                    fontWeight="medium"
                    width={"250px"}
                    height="50px"
                    boxShadow={"2px 2px black"}
                    m={5}
                    _hover={{
                      bg: 'myTeal.100',
                    }}
                    _active={{bg:"myTeal.100",color:"white"}}
                  >Get Started</Button>
            </RouterLink>
             
              <RouterLink to="/dashboard">
              <Button
                bg={'gold.100'}
                color={'white'}
                fontSize="18px"
                fontWeight="medium"
                width={"250px"}
                height="50px"
                boxShadow={"2px 2px black"}
                m={5}
                _hover={{
                  bg: 'gold.100',
                }}
                _active={{bg:"gold.100",color:"white"}}
              >About us </Button>
              </RouterLink>
              
          </Box>
         
     </Box>
  )
}

export default Home