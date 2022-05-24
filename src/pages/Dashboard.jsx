import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery  } from '@apollo/client';
import Cookies from 'js-cookie'

import {
  Box,
  Heading,
  Text,
  Stack,
Avatar,
  useColorModeValue,
  Image,
  Checkbox,
  Button,
  Icon,
  
} from '@chakra-ui/react';

import {AiOutlinePlusCircle,AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'

const Dashboard = () => {
  return (
  
      <Box
        maxW={'400px'}
        maxH="500px"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        
        {/* Heading */}
        <Stack spacing={3}>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Text
              color={'myTeal.100'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              Task
            </Text>
            <Text
              color={'myTeal.100'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'10px'}
              letterSpacing={1.1}>
              In Progress
            </Text>
          </Box>
         
            {/* Title */}
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={"2xl"}
              >
              Boost your conversion rate
            </Heading>
            {/* note */}
            <Text color={'gray.500'} fontSize="12px">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
              et ea rebum.
            </Text>
        </Stack>


        {/* Steps */}
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={"15px"}
            mt={5} 
          >
              Steps
          </Heading>

        <Stack spacing={1} ml={2} mt={2} direction='column'>
       
            <Checkbox _focus={{boxShadow: 'none'}} colorScheme='green' defaultChecked >
              <Text fontSize={"11px"}>Checkbox</Text>
            </Checkbox>
            <Checkbox colorScheme='green' defaultChecked >
              <Text fontSize={"11px"}>Checkbox</Text>
            </Checkbox>
            <Checkbox colorScheme='green' defaultChecked >
              <Text fontSize={"11px"}>Checkbox</Text>
            </Checkbox>
            <Checkbox colorScheme='green' defaultChecked >
              <Text fontSize={"11px"}>Checkbox</Text>
            </Checkbox>
            <Checkbox colorScheme='green' defaultChecked >
              <Text fontSize={"11px"}>Checkbox</Text>
            </Checkbox>
            <Checkbox colorScheme='green' defaultChecked >
              <Text fontSize={"11px"}>Checkbox</Text>
            </Checkbox>
        </Stack>

        <Stack mt={6} direction={'row'} spacing={4} align={'center'} justifyContent="space-between">
            
            {/* Date */}
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text color={'gray.500'} fontSize="12px">Feb 08, 2021</Text>
              </Stack>

              {/* Icons */}
              <Box
               display={"flex"}
               justifyContent="space-between"
               alignItems={"center"}
               width={"100px"}
              >
              
                <Icon as={AiOutlineEdit} color="myTeal.100" w={7} h={7} cursor="pointer"/>
                <Icon as={AiOutlineDelete} color="myTeal.100" w={7} h={7} cursor="pointer"/>
                <Icon as={AiOutlinePlusCircle} color="myTeal.100" w={7} h={7} cursor="pointer"/>
              </Box>
          
          
        </Stack>
      </Box>
 
  )
}

export default Dashboard