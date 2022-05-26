import React from 'react'
import { 

    Stack,
    Skeleton 
  } from "@chakra-ui/react"
const FormLoader = () => {
  return (
    <Stack spacing={4}>
        <Stack spacing={1}>
        <Skeleton height='20px' width={"50%"} />
        <Skeleton height='40px' />
        </Stack>
        
        
        <Stack spacing={1}>
        <Skeleton height='20px' width={"45%"} />
        <Skeleton height='40px' />
        </Stack>

        <Stack spacing={1}>
        <Skeleton height='20px' width={"40%"} />
        <Skeleton height='40px' />
        </Stack>

        <Skeleton height='40px' />
    </Stack>
  )
}

export default FormLoader