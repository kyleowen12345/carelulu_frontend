import React from 'react'
import { useMutation, gql  } from "@apollo/client";
import {AiOutlineDelete} from 'react-icons/ai'
import { Spinner,Icon, useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { MYTASKS } from '../pages/Dashboard';


const DELETETASK = gql`
mutation DeleteTask($deleteTaskId: Int!) {
  deleteTask(id: $deleteTaskId) {
    success
    message
  }
}
`;


const TaskDelete = ({taskId}) => {
  const token = Cookies.get('carelulu');
  const toast = useToast()
  const [deletetask, { loading, data, error }] = useMutation(DELETETASK,{
    errorPolicy: 'all',
    variables:{
      deleteTaskId:taskId
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
        perPage:5,
        fieldOrder:"createdAt",
        sort:"DESC"
    },
        context:{
            headers:{
                token:token || ""
            }
        }
    }
    ],
    onCompleted:data =>{
       if(data){
        toast({
          title: `Delete Successful`,
          description:`wait for a moment to let it sink in or reload the page`,
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
          description:`Could not delete the task`,
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
      as={AiOutlineDelete}
      w={7}
      h={7}
      cursor="pointer"
      onClick={deletetask}
     />
  
}

export default TaskDelete