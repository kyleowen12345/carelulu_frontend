import React from 'react'
import {  Box, Image  } from '@chakra-ui/react'
import { Link as RouterLink  } from "react-router-dom";
import ToggleMenu from './ToggleMenu'


const Header = () => {
  return (
    <Box
        height={"50px"}
        minW={"100%"}
        bg={"myTeal.100"}
        display="flex"
        justifyContent={"center"}
        px={1}
        as="header"
        
    >
      <Box
       w={["90%","90%","90%","90%","960px"]}
       display="flex"
       justifyContent={"space-between"}
       alignItems="center"
      > 
        <RouterLink to="/">
             <Image height={"35px"} src='https://c2zyebdn.cloudimg.io/s/cdn/x/https:/divin2sy6ce0b.cloudfront.net/images/2017-11-06/whiteLogo2-min.png'/>
        </RouterLink>
         
         <ToggleMenu/>
      </Box>

    </Box>
  )
}

export default Header