import React from 'react'
import Moment from 'react-moment';
import {
    Box,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    
  } from '@chakra-ui/react';
  
import TaskModalUpdate from '../TaskModalUpdate';
import TaskDelete from '../TaskDelete';
import TaskComplete from '../TaskComplete';

const DashboardCards = ({details}) => {
  return (
    <Box
        maxW={'765px'}
        h="300px"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        display="flex"
        flexDirection={"column"}
        justifyContent="space-between"
        border={"2px solid "}
        borderColor={details.status === "Complete" ? "gold.100":'myTeal.100'}
        >
        
        {/* Heading */}
        <Stack spacing={3}>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Text
              color={details.status === "Complete" ? "gold.100":'myTeal.100'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              Task
            </Text>
            <Text
              color={details.status === "Complete" ? "gold.100":'myTeal.100'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'10px'}
              letterSpacing={1.1}>
              {details.status}
            </Text>
          </Box>
         
            {/* Title */}
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={"2xl"}
              >
              {details.title}
            </Heading>
            {/* note */}
            <Text color={'gray.500'} fontSize="12px">
               {details.note}
            </Text>
        </Stack>


        {/* Steps */}
          
         {/* For future deployment */}
        {/* <Stack spacing={1}  mt={2} direction='column'>
            <Heading
                color={useColorModeValue('gray.700', 'white')}
                fontSize={"15px"}
                mb={3} 
            >
                Steps
            </Heading>
            { details.steps.length < 1 ? 
            <Text
             
            >
              No steps
                 
            </Text>
            :
                details.steps.map(i=>(
                <Checkbox  _focus={{boxShadow: 'none'}} colorScheme='green' defaultChecked={i.complete === true} >
                    <Text fontSize={"11px"}>{i.content}</Text>
                </Checkbox>
                ))
            }
            
        </Stack> */}

        {/* Options */}
        <Stack mt={6} direction={'row'} spacing={4} align={'center'} justifyContent="space-between">
            
            {/* Date */}
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            
              <Text color={'gray.500'} fontSize="12px">Created - <Moment fromNow>{Date.parse(details.createdAt)|| details.createdAt}</Moment></Text>
              <Text color={'gray.500'} fontSize="12px">Updated - <Moment fromNow>{Date.parse(details.updatedAt)|| details.updatedAt}</Moment></Text>
              </Stack>

              {/* Icons */}
              <Box
               display={"flex"}
               justifyContent="space-between"
               alignItems={"center"}
               width={"100px"}
               color={details.status === "Complete" ? "gold.100":'myTeal.100'}
              >
              
                <TaskModalUpdate taskId={details.id}/>
                <TaskDelete taskId={details.id}/>
                <TaskComplete taskId={details.id} title={details.title} note={details.note}/>
                
              </Box>
          
          
        </Stack>

      </Box>
  )
}

export default DashboardCards