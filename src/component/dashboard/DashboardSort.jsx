import React, { useState } from 'react'
import { useNavigate  } from "react-router-dom";
import {
  Box,
  Text,
  Select,
  Button
} from '@chakra-ui/react';

const DashboardSort = () => {
  const navigate = useNavigate();
  const [field,setField] = useState('createdAt')
  const [order,setOrder] = useState('DESC')
  const options = [ 
    {
      name:"Date",
      value:"createdAt"
    },
    {
      name:"Title",
      value:"title"
    },
    {
      name:"Note",
      value:"note"
    },
    {
      name:"Status",
      value:"status"
    },
  ]
  const sort = [
    {
      name:"Descending",
      value:"DESC"
    },
    {
      name:"Ascending",
      value:"ASC"
    }
  ]

  const handleSubmit = () => {
      return navigate(`/dashboard?curPage=1&perPage=4&fieldOrder=${field}&sort=${order}`)
  }
  return (
    <Box>
      <Text 
        color="gray"
        mb={1}
        fontSize="13px"
      >
          Sort by
      </Text>
        <Box 
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        >
         <Select
            width={"40%"}
            onChange={(e)=>{setField(e.target.value)}}
            >
            {options.map(i=>(
                <option key={i.name} value={i.value}>{i.name}</option>
            )) }
          </Select>
          <Select
                width={"40%"}
                onChange={(e)=>{setOrder(e.target.value)}}
          >
          {sort.map(i=>(

              <option key={i.name} value={i.value}>{i.name}</option>
          )) }
          </Select>    

          <Button
           loadingText="Submitting"
           bg={'myTeal.100'}
           color={'white'}
           type="submit" 
           width={"15%"}
           fontWeight="light"
           _hover={{
             bg: 'myTeal.50',
           }}
           onClick={handleSubmit}
          > Sort</Button>      
     </Box>
    </Box>
     
  )
}

export default DashboardSort