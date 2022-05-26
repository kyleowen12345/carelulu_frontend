import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { Spinner,Icon, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'



const COMPLETETASK = gql`
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



const TaskComplete = ({taskId,title,note}) => {
    const toast = useToast()
    
    const token = Cookies.get('carelulu');

    const [completetask, { loading, data, error }] = useMutation(COMPLETETASK,{
        errorPolicy: 'all',
        variables:{
            updateTaskId:taskId,
            title:title,
            note:note,
            status:"Complete",
          },
          context:{
            headers:{
              token:token || ""
            }
          },
        onCompleted:data =>{
           if(data){
            toast({
              title: `Update Successful`,
              description:`wait for a moment to let it sink in pr reload the page`,
              status:"success",
              position:"top-right",
              isClosable: true,
            })
           }
        },
        onError:error => {
          if(error){
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
  return loading ? 
  <Spinner size='xs' color="myTeal.100" />
   :
  <Icon 
    as={AiOutlinePlusCircle}
    w={7}
    h={7}
    cursor="pointer"
    onClick={completetask}
   />
}

export default TaskComplete