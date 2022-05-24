import React from 'react'
import {  Box,Text,Link  } from '@chakra-ui/react'

const SmallLinks = () => {
    const firstRow =
    [
        {
            name:"About Us",
            route:"https://www.carelulu.com/about-us"
        },
        {
            name:"How It Works",
            route:"https://www.carelulu.com/how-it-works"
        },
        {
            name:"Contact Us",
            route:"https://www.carelulu.com/terms-of-use"
        }

    ]
    const secondRow = 
    [
        {
            name:"Parent Resources",
            route:"https://www.carelulu.com/resources/parents"
        },
        {
            name:"Provider Resources",
            route:"https://www.carelulu.com/resources/childcare-providers"
        },
    ]
  return (
     <Box
        color="white"
     >
         <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            mb={5}
         >
             {
                 firstRow.map(i=>(
                     <Link
                       key={i.route}
                       href={i.route}
                       target="_blank"
                     >
                        <Text
                         fontSize="14px"
                         mx={2}
                        >
                            {i.name}
                        </Text>
                     </Link>
                 ))
             }
         </Box>

         <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
          >
             {
                 secondRow.map(i=>(
                    <Link
                    key={i.route}
                    href={i.route}
                    target="_blank"
                  >
                     <Text
                      fontSize="14px"
                      mx={2}
                     >
                         {i.name}
                     </Text>
                  </Link>
                 ))
             }
         </Box>
     </Box>
  )
}

export default SmallLinks