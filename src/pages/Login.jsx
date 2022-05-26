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
  Link,
  Alert,
  AlertIcon,
  useToast,
  Checkbox 
} from '@chakra-ui/react';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import Cookies from 'js-cookie'

const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

const Login = () => {
  const navigate = useNavigate();

  const toast = useToast()



  const [signin, { data, loading, error }] = useMutation(LOGIN,{
    errorPolicy: 'all',
    onCompleted:data =>{
       if(data){
        Cookies.set('carelulu',data?.login.token,{expires:1,secure:true})
          toast({
            title: `Login successful.`,
            description:`Set up your tasks`,
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
    await signin({variables:{email:email,password:password}})
    
};

  return (
    <>
  <Helmet title={'Login'}>
    <body id={'Login'}></body>
  </Helmet>
      <Flex
    minH={'80vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>

    <Stack 
      spacing={8}
      mx={'auto'}
      minW={['300px','300px','300px','500px']} 
      py={12}
      px={6}>

        {/* Heading */}
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Login</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          Manage your tasks now ✌️
        </Text>
      </Stack>

        {/* Form */}
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>

       <form onSubmit={handleSubmit(onSubmit)}> 
          <Stack spacing={4}>

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


            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>

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
                        Sign in
                      </Button>
                </Stack>
                <Stack pt={6}>
                <RouterLink to={'/register'}>
                  <Text align={'center'} color={'myTeal.100'}>
                      No Account? 
                  </Text>
                </RouterLink>
                </Stack>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  </Flex>
    </>
    
  )
}

export default Login