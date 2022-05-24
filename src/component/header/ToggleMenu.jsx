import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Icon 
  } from '@chakra-ui/react'
  import {AiOutlineDown} from 'react-icons/ai'
  import { Link as RouterLink } from "react-router-dom";


   

const ToggleMenu = () => {
  const routes = [
    {
      name:'Home',
      route:'/'
    },
    {
      name:'Login',
      route:'/login'
    },
    {
      name:'Register',
      route:'/register'
    },
    {
      name:'About Us',
      route:'/about-us'
    }
  ]
  return (
     <Menu>
      <MenuButton 
        as={Button} 
        rightIcon={<Icon as={AiOutlineDown} />}
        bg={"gold.100"}
        borderRadius={2}
        color={"white"}
        _hover={{bg:"gold.100",color:"white"}}
        _active={{bg:"gold.100",color:"white"}}
        fontSize="13px"
        fontWeight={"light"}
      >
        Menu
      </MenuButton>
      <MenuList
        bg={"gold.100"}
        color={"white"}
      >
        {routes.map(i=>(
          <RouterLink
          key={i.route}
          to={i.route}
          >
              <MenuItem
              _hover={{bg:"#FFFFFF ",color:"gold.100",opacity:0.7}}
              _focus={{bg:"gold.100",color:"white"}}
              
              >{i.name}</MenuItem>
          </RouterLink>

        ))}
      </MenuList>
</Menu>
  )
}

export default ToggleMenu