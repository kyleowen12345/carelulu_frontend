import React from 'react'
import { useReactiveVar   } from '@apollo/client';
import { fetchUserVar } from '../../App';

import {
    Box,
    Text,
  } from '@chakra-ui/react';

import TaskModelCreate from '../TaskModelCreate';




const DashboardCreator = () => {
  const userDetails = useReactiveVar(fetchUserVar);
  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      alignItems={"center"}
      mt={5}
    >
         <Box>
            <Text
             fontSize={"13px"}
            >Welcome</Text>
            <Text
            fontSize={"18px"}
            fontWeight="bold"
            >{userDetails.firstName}</Text>
        </Box>
        <TaskModelCreate/>
    </Box>
  )
}

export default DashboardCreator