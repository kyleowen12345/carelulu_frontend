import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import { useForm } from 'react-hook-form';

import { 
    Icon,
    Text,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack, 
    useToast
  } from "@chakra-ui/react"
import Cookies from 'js-cookie'

  
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { MYTASKS } from '../pages/Dashboard';


const CREATETASK = gql`
mutation CreateTask($title: String!, $note: String!, $status: String!) {
    createTask(title: $title, note: $note, status: $status) {
      id
      title
      note
      status
      user {
        id
        firstName
        email
      }
      steps {
        id
        content
        complete
      }
      createdAt
      updatedAt
    }
  }
`;

const TaskModelCreate = () => {
    const toast = useToast()
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    const token = Cookies.get('carelulu');

    const { register, formState: { errors } , handleSubmit,reset  } = useForm();

     const [createtask, { loading }] = useMutation(CREATETASK,{
      errorPolicy: 'all',
      onCompleted:data =>{
         if(data){
          setIsOpen(false)
          reset()
          toast({
            title: `Creation Successful`,
            description:`wait for a moment to let it sink in or reload the page`,
            status:"success",
            position:"top-right",
            isClosable: true,
          })
         }
      },
      onError:error => {
        if(error){
          setIsOpen(false)
          toast({
            title: `Something went wrong`,
            description:`Could not update the task`,
            status:"error",
            position:"top-right",
            isClosable: true,
          })
        }
   }
    });

    const onSubmit = async(data) => {
      
        return await createtask({
          variables:{
            title:data.title,
            note:data.note,
            status:data.status,
          },
          context:{
            headers:{
              token:token || ""
            }
          },
          refetchQueries:[
            {
                query:MYTASKS,
                variables:{ 
                curPage:1,
                perPage:4,
                fieldOrder:"createdAt",
                sort:"DESC"
            },
                context:{
                    headers:{
                        token:token || ""
                    }
                }
            }
          ]
        })
    };
    const options = ["","In Progress","Complete","Incomplete","Awaiting Assignment","Repossessed","Client review","Approved and paid"]
  return (
  <>
        <Button
          loadingText="Submitting"
          bg={'myTeal.100'}
          color={'white'}
          type="submit" 
          width={"150px"}
          fontWeight="light"
          _hover={{
            bg: 'myTeal.50',
          }}
          onClick={() => setIsOpen(true)}
        >
                Create Task
                <Icon as={AiOutlinePlusCircle} ml={2} w={6} h={6} cursor="pointer"/>
        </Button>


        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Create Task
            </AlertDialogHeader>
            <AlertDialogCloseButton />
           
            <AlertDialogBody>

             <form onSubmit={handleSubmit(onSubmit)}> 
              <Stack spacing={4}>

                {/* Title */}
                <FormControl id="title" >
                  <FormLabel>Title</FormLabel>
                  <Input type="text" 
                    
                    {...register('title', {
                      required: 'this is required',
                      minLength: {
                        value: 5,
                        message: 'Min length is 5',
                      },
                    })}
                    isInvalid={errors.title && errors.title.message}
                    errorBorderColor="crimson"
                  />
                  <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.title && errors.title.message}</Text>
                </FormControl>

                {/* Note */}
                <FormControl id="note" >
                  <FormLabel>Note</FormLabel>
                  <Input type="text" 
                   
                    {...register('note', {
                      required: 'this is required',
                      minLength: {
                        value: 5,
                        message: 'Min length is 5',
                      },
                    })}
                    isInvalid={errors.note && errors.note.message}
                    errorBorderColor="crimson"
                  />
                  <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.note && errors.note.message}</Text>
                </FormControl>

                {/* Status */}
                <FormControl id="status" >
                  <FormLabel>Status</FormLabel>
                  <Select
                     
                    {...register('status', {
                    required: 'this is  required',
                    minLength: {
                    value: 5,
                    message: 'Min length is 5',
                    },
                    })}
                    isInvalid={errors.status && errors.status.message}
                    errorBorderColor="crimson"
                    >
                    {options.map(i=>(
                        <option key={i} value={i}>{i}</option>
                    )) }
                </Select>
                  
                  <Text color="red" ml={2} mt={1} fontSize={["12px","12px","12px","14px"]}>{errors.status && errors.status.message}</Text>
                </FormControl>

                <Button 
                loadingText="Submitting"
                size="lg"
                bg={'myTeal.100'}
                color={'white'}
                type="submit" 
                disabled={loading}
                isLoading={loading}
                fontWeight="light"
                _hover={{
                  bg: 'myTeal.50',
                }}>
                     Save
                </Button>

                                
                            
                                
                </Stack>
           </form> 
           
           

                  
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>


  </>
    
  )
}

export default TaskModelCreate