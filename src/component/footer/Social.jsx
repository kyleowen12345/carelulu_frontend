import React from 'react'
import {  Box, Image,Link, Button  } from '@chakra-ui/react'
import instagram from '../../assests/images/instagram.png'
import facebook from '../../assests/images/facebook.png'
import twitter from '../../assests/images/twitter.png'

const Social = () => {
    const images = 
    [
        {
            route:"https://www.facebook.com/Carelulu/",
            source:facebook
        },
        {
            route:"https://twitter.com/mycarelulu",
            source:twitter
        },
        {
            route:"https://instagram.com/mycarelulu",
            source:instagram
        }
    ]
  return (
    <Box
        display={"flex"}
        flexDirection="column"
        justifyContent="center"
        alignItems={"center"}
    >
        <Box
         display={"flex"}
         justifyContent="center"
         alignItems={"center"}
         mb={4}
        >
            {
               images.map(i=>(
                  <Link
                    key={i.route}
                    href={i.route}
                    mx={2}
                    target="_blank"
                  >
                      <Image
                       height={"40px"}
                        src={i.source}
                      />
                  </Link>
               ))
            }
        </Box>
        <Link
          href='https://carelulu.zendesk.com/hc/en-us'
          target={"_blank"}
          style={{ textDecoration: 'none' }}
        >
            <Button
            borderRadius={2}
            fontWeight="light"
            color={"myTeal.100"}
            >
                Help Center
            </Button>
        </Link>
        
    </Box>
  )
}

export default Social