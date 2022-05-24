import React from 'react'
import {  Box,Text,Link  } from '@chakra-ui/react'



const FooterLinks = () => {
    const content =
    [
      {
          header:"For Parents",
          children:[
              {
                 name:"Parent Resources",
                 route:"https://www.carelulu.com/resources/parents" 
              },
              {
                name:"How It Works",
                route:"https://www.carelulu.com/how-it-works" 
             },
             {
                name:"Testimonials",
                route:"https://www.carelulu.com/testimonials" 
             },
             {
                name:"Terms of Use",
                route:"https://www.carelulu.com/terms-of-use" 
             },
             {
                name:"Privacy Policy",
                route:"https://www.carelulu.com/privacy-policy" 
             }
          ]
      },
      {
        header:"For Providers",
        children:[
            {
               name:"Provider Resources",
               route:"https://www.carelulu.com/resources/childcare-providers" 
            },
            {
              name:"How It Works",
              route:"https://www.carelulu.com/get-started" 
           },
           {
              name:"Testimonials",
              route:"https://www.carelulu.com/provider-testimonials" 
           },
           {
              name:"Terms and Conditions",
              route:"https://www.carelulu.com/terms-for-providers" 
           },
           {
              name:"List Your Program",
              route:"https://www.carelulu.com/register" 
           }
        ]
      },
        {
            header:"More",
            children:[
                {
                name:"About Us",
                route:"https://www.carelulu.com/resources/parents" 
                },
                {
                name:"Press",
                route:"https://www.carelulu.com/how-it-works" 
            },
            {
                name:"Jobs",
                route:"https://www.carelulu.com/testimonials" 
            },
            {
                name:"Contact Us",
                route:"https://www.carelulu.com/terms-of-use" 
            }
            
            ]
        }
    ]

  return (
    <Box
     display={"flex"}
     maxW="530px"
    >
        {
            content.map(i=>(
                <Box
                key={i.header}
                width={"159px"}
                color="white"
                mx={3}
                >
                     <Text 
                     as="h2"
                     mb={1}
                     >{i.header}</Text>
                     {i.children.map(e=>(
                         <Link
                           href={e.route}
                           target="_blank"
                           key={e.route}
                          
                         >
                         
                                <Text
                                    fontSize="13px"
                                   mb={1}
                                >
                                    {e.name}
                                </Text>
                         </Link>
                        
                     ))}
                </Box>   
            ))
        }
    </Box>
  )
}

export default FooterLinks