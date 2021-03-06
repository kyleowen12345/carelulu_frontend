import React from 'react'
import {  Box, Image,useMediaQuery,Link  } from '@chakra-ui/react'
import FooterLinks from './FooterLinks'
import Social from './Social'
import SmallLinks from './SmallLinks'
import footercarelulu from '../../assests/images/footercarelulu.png'

const Footer = () => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)')
  return (
    <Box
      height={isLargerThan992 ? "220px" : "398px"}
      minW={"100%"}
      bg={"myTeal.100"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      as="footer"
      py={5}
      bottom={0}
      mt={5}
    >
      <Box
       h={["90%","90%","90%","90%","145px"]}
       display="flex"
       justifyContent={"space-between"}
       flexDirection={isLargerThan992 ? "row":"column"}
       alignItems="center"
      >
        <Link
          href='https://www.carelulu.com/'
          target={"_blank"}
        >
           <Image w={"153px"} mr={7} src={footercarelulu}/>
        </Link>
        {isLargerThan992 ? <FooterLinks/> : <SmallLinks/> }
        <Social/>
      </Box>
    </Box>
  )
}

export default Footer