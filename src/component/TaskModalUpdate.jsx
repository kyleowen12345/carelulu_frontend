import React, { useEffect } from 'react'
import { useLazyQuery,useMutation, gql  } from "@apollo/client";
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
  
import {AiOutlineEdit} from 'react-icons/ai'
import FormLoader from './loaders/FormLoader';

const VIEWTASK = gql`
query Viewtask($viewtaskId: Int!) {
    Viewtask(id: $viewtaskId) {
      id
      note
      title
      status
      createdAt
      updatedAt
    }
  }
`;

const UPDATETASK = gql`
mutation UpdateTask($updateTaskId: Int!, $title: String!, $note: String!, $status: String!) {
  updateTask(id: $updateTaskId, title: $title, note: $note, status: $status) {
    id
    title
    note
    status
    steps {
      content
      complete
    }
    createdAt
    updatedAt
  }
}
`;

const TaskModalUpdate = ({taskId}) => {
    const toast = useToast()
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    const token = Cookies.get('carelulu');

    const [viewtask,{  loading, data }] = useLazyQuery(
        VIEWTASK,
        {   
           variables:{
              viewtaskId:taskId,
           },
            context:{
                headers:{
                    token:token || ""
                }
            },
            fetchPolicy:"cache-and-network ",
            onCompleted:data => {
                if(data){
                    // condition
                    
                }
            },
            onError:error => {
                 if(error){
                  toast({
                    title: `Something went wrong`,
                    description:`Could not fetch the task`,
                    status:"error",
                    position:"top-right",
                    isClosable: true,
                  })
                 }
            }
           
        }
      )

      useEffect(() => {
        if(isOpen){
            viewtask()
    
        }
    
     }, [isOpen,viewtask])

     const { register, formState: { errors } , handleSubmit } = useForm();

     const [updatetask, { loading:updateLoading }] = useMutation(UPDATETASK,{
      errorPolicy: 'all',
      onCompleted:data =>{
         if(data){
          setIsOpen(false)
          toast({
            title: `Update Successful`,
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
    const options = ["","In Progress","Complete","Incomplete","Awaiting Assignment","Repossessed","Client review","Approved and paid"]

    const onSubmit = async(data) => {
      
        return await updatetask({
          variables:{
            updateTaskId:taskId,
            title:data.title,
            note:data.note,
            status:data.status,
          },
          context:{
            headers:{
              token:token || ""
            }
          }
        })
    };
  return (
      <>
      <Icon as={AiOutlineEdit}  w={7} h={7} cursor="pointer" onClick={() => setIsOpen(true)}/>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Update Task 
            </AlertDialogHeader>
            <AlertDialogCloseButton />
           
            <AlertDialogBody>
           {
             data ? 
             <form onSubmit={handleSubmit(onSubmit)}> 
              <Stack spacing={4}>

                {/* Title */}
                <FormControl id="title" >
                  <FormLabel>Title</FormLabel>
                  <Input type="text" 
                    defaultValue={data?.Viewtask.title}
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
                    defaultValue={data?.Viewtask.note}
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
                     defaultValue={data?.Viewtask.status}
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
                disabled={updateLoading}
                isLoading={updateLoading}
                fontWeight="light"
                _hover={{
                  bg: 'myTeal.50',
                }}>
                     Save
                </Button>

                                
                            
                                
                </Stack>
           </form> 
            :
            <FormLoader/> 
           }
           

                  
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </>
    
  )
}

export default TaskModalUpdate