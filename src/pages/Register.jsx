import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Link as RouterLink,useNavigate  } from "react-router-dom";
import { Helmet } from "react-helmet-async";


import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  useToast 
} from '@chakra-ui/react';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import Cookies from 'js-cookie'


const REGISTER = gql`
mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  register(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    user {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
    token
  }
}
`;



const Register = () => {
  const navigate = useNavigate();

  const toast = useToast()

  const [signup, { data, loading, error }] = useMutation(REGISTER,{
    errorPolicy: 'all',
    onCompleted:data =>{
       if(data){
        Cookies.set('carelulu',data?.register.token,{expires:1,secure:true})
          toast({
            title: `Registration is successful.`,
            description:`Set up your tasks -  ${data?.register.user.firstName}`,
            status:"success",
            position:"top-right",
            isClosable: true,
          })
        navigate("/dashboard")  
       }
    }
  });

  

  const { register, formState: { errors } , handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async({firstName,lastName,email,password}) => {
    await signup({variables:{firstName:firstName,lastName:lastName,email:email,password:password}})
    
};
  console.log(process.env.REACT_APP_API_URL)
  return (
    <>
    <Helmet title={'Register'}>
      <body id={'register'}></body>
    </Helmet>
          <Flex
          minH={'80vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
          >
          <Stack 
             spacing={8} 
             mx={'auto'} 
             minW={['300px','300px','300px','500px']} 
             py={12} 
             px={6}
          >
            {/* Heading */}
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                      Register
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                      Manage your tasks now ✌️
                    </Text>
                </Stack>
                {/* Form */}
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >

                <form onSubmit={handleSubmit(onSubmit)}> 
                    <Stack spacing={4}>
                    
                          {/* First Name */}
                          <FormControl id="firstName" isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input type="text" 
                              {...register('firstName', {
                                required: 'this is required',
                                minLength: {
                                  value: 5,
                                  message: 'Min length is 5',
                                },
                              })}
                              isInvalid={errors.firstName && errors.firstName.message}
                              errorBorderColor="crimson"
                            />
                            <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.firstName && errors.firstName.message}</Text>
                          </FormControl>
                        
                         {/* Last Name */}
                          <FormControl id="lastName">
                            <FormLabel>Last Name</FormLabel>
                            <Input type="text"
                              {...register('lastName', {
                                required: 'this is required',
                                minLength: {
                                  value: 5,
                                  message: 'Min length is 5',
                                },
                              })}
                              isInvalid={errors.lastName && errors.lastName.message}
                              errorBorderColor="crimson"
                            />
                            <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.lastName && errors.lastName.message}</Text>
                          </FormControl>
                        
                        {/* Email */}
                      <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email"
                            {...register('email', {
                            required: 'this is required',
                            pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Invalid email address',
                            },
                            })}
                            isInvalid={errors.email && errors.email.message}
                            errorBorderColor="crimson"
                        />
                        <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.email && errors.email.message}</Text>
                      </FormControl>

                      {/* Password */}
                      <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input type={showPassword ? 'text' : 'password'}  
                              {...register('password', {
                                required: 'this is required',
                                minLength: {
                                  value: 5,
                                  message: 'Min length is 5',
                                },
                              })}
                              isInvalid={errors.password && errors.password.message}
                              errorBorderColor="crimson"
                          />
                          <InputRightElement h={'full'}>
                            <Button
                              variant={'ghost'}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }>
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.password && errors.password.message}</Text>
                      </FormControl>

                      {/* Error Message */}
                      {
                        error &&
                        <Alert status='error'>
                          <AlertIcon />
                            {error?.message}
                        </Alert>
                      }

                      {/* Button */}
                      <Stack spacing={10} pt={2}>
                        <Button
                          loadingText="Submitting"
                          size="lg"
                          bg={'myTeal.100'}
                          color={'white'}
                          type="submit" 
                          disabled={loading||data}
                          isLoading={loading}
                          fontWeight="light"
                          _hover={{
                            bg: 'myTeal.50',
                          }}>
                          Sign up
                        </Button>
                      </Stack>
                      <Stack pt={6}>
                      <RouterLink to={'/login'}>
                        <Text align={'center'} color={'myTeal.100'}>
                            Already have an account?
                        </Text>
                      </RouterLink> 
                      </Stack>
                    </Stack>
                </form> 

            </Box>
          </Stack>
        </Flex>
    </>
       
      
    
  )
}

export default Register