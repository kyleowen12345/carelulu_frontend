import React from 'react'
import {
    Box,
    Grid,
    Stack,
    Skeleton,
    SkeletonText,
    SkeletonCircle
} from '@chakra-ui/react'



const DashboardLoader = () => {
    const loaders=[1,2,3,4]
  return (
    <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)']}  gap={3}>   
            {
                loaders.map(i=>(
                    <Box
                    key={i}
                    maxW={'765px'}
                    h="300px"
                    bg={'white'}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="space-between"
                    border={"2px solid "}
                    borderColor={'myTeal.100'}
                    >
                
                {/* Heading */}
                <Stack spacing={3}>
                <Box
                    display={"flex"}
                    justifyContent="space-between"
                    alignItems={"center"}
                >
                    <Skeleton height='10px' w={"50px"}/>
                    <Skeleton height='10px' w={"50px"} />
                </Box>
                
                    {/* Title */}
                    <Skeleton height='30px' />
                    {/* note */}
                    <SkeletonText mt='3' noOfLines={4} spacing='4' />
                </Stack>


                {/* Steps */}
                
                   {/* For future Deployment */}
                {/* <Stack spacing={1}  mt={2} direction='column'>
                    <Skeleton height='20px' />
                    <SkeletonText mt='3' noOfLines={4} spacing='4' />
                    
                </Stack> */}

                {/* Options */}
                <Stack mt={6} direction={'row'} spacing={4} align={'center'} justifyContent="space-between">
                    
                    {/* Date */}
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    
                    <Skeleton height='10px' mb={2}  w={"100px"} />
                    <Skeleton height='10px'  w={"100px"} />
                    </Stack>

                    {/* Icons */}
                    <Box
                    display={"flex"}
                    justifyContent="space-between"
                    alignItems={"center"}
                    width={"150px"}
                    >
                    
                    <SkeletonCircle size='10' />
                    <SkeletonCircle size='10' />
                    <SkeletonCircle size='10' />
                        
                    </Box>
                
                
                </Stack>

            </Box> 
                ))
            }
           
    </Grid> 
  )
}

export default DashboardLoader