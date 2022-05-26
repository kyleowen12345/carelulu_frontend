import React from 'react'
import { gql, useQuery,useReactiveVar   } from '@apollo/client';
import {  useNavigate} from "react-router-dom";
import { fetchUserVar } from '../../App';
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
  import Cookies from 'js-cookie'


  const FETCHUSER = gql`
query FetchUser {
    fetchUser {
      id
      firstName
      lastName
      email
      
        createdAt
        updatedAt
      }
    }
  
`; 

const ToggleMenu = () => {
  const userDetails = useReactiveVar(fetchUserVar);
  const navigate = useNavigate();
  const {client, } = useQuery(FETCHUSER)
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
    
  ]
  const userroutes = [
    {
      name:'Home',
      route:'/'
    },
    {
      name:'Dashboard',
      route:'/dashboard'
    },
   
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
        {
          userDetails.email ?  
          userroutes.map(i=>(
            <RouterLink
            key={i.route}
            to={i.route}
            >
                <MenuItem
                _hover={{bg:"#FFFFFF ",color:"gold.100",opacity:0.7}}
                _focus={{bg:"gold.100",color:"white"}}
                
                >{i.name}</MenuItem>
            </RouterLink>
  
          ))
          :
        routes.map(i=>(
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
       {userDetails.firstName && <MenuItem
              _hover={{bg:"#FFFFFF ",color:"gold.100",opacity:0.7}}
              _focus={{bg:"gold.100",color:"white"}}
              onClick={()=>{
                client.clearStore()
                Cookies.remove('carelulu')
                fetchUserVar({})
                navigate('/login')
              }}
              
              >Logout</MenuItem>}
      </MenuList>
</Menu>
  )
}

export default ToggleMenu