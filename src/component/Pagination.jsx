import React from 'react'

import {
  Button,
  Box,
  Text
} from '@chakra-ui/react';
import { useSearchParams  , useNavigate} from "react-router-dom";

const Pagination = ({marginPages,pageRange,initialPage,pageCount}) => {
  const [searchParams] = useSearchParams();

  let navigate = useNavigate();
  const curPage = searchParams.get('curPage')
      const perPage = searchParams.get('perPage')
      const fieldOrder = searchParams.get('fieldOrder')
      const sort = searchParams.get('sort')
   
    return (
        
       <Box
       display="flex"
       justifyContent={"center"}
       alignItems="center"
       flexDirection={"column"}
       >
         <Box
           w={["250px","250px","300px"]}
           display="flex"
           justifyContent={"space-between"}
           alignItems="center"
         >
            <Button
             bg={'myTeal.100'}
             color={'white'}
             type="submit" 
             width={"100px"}
             fontWeight="light"
             _hover={{
               bg: 'myTeal.50',
             }}
            disabled={parseInt(curPage) === 1}
            onClick={()=>{
              navigate(`/dashboard?curPage=${curPage ? parseInt(curPage)-1 : 1}&perPage=${perPage ? perPage:4}&fieldOrder=${fieldOrder ? fieldOrder : "createdAt"}&sort=${sort ? sort : "DESC"}`)
            }}
            >
              Previous
            </Button>
            <Button
             bg={'myTeal.100'}
             color={'white'}
             type="submit" 
             width={"100px"}
             fontWeight="light"
             _hover={{
               bg: 'myTeal.50',
             }}
            disabled={pageCount === parseInt(curPage) }
              onClick={()=>{
                navigate(`/dashboard?curPage=${curPage ?parseInt(curPage)+1 : 2}&perPage=${perPage ? perPage:4}&fieldOrder=${fieldOrder ? fieldOrder : "createdAt"}&sort=${sort ? sort : "DESC"}`)
              }}
            >
              Next
            </Button>
         </Box>
         
         <Box
         mt={5}
          w={["250px","250px","300px"]}
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
          flexDirection={"column"}
         >
            <Text>  {curPage ? curPage : 1}/{pageCount}</Text>
            <Text>Total Pages  {pageCount}</Text>
         </Box>
         
       </Box>

        
          
    )
}

export default Pagination