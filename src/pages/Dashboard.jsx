import React, {  useEffect } from 'react';
import { gql, useLazyQuery  } from '@apollo/client';
import Cookies from 'js-cookie'
import { useSearchParams  , useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Grid,
  Stack,
} from '@chakra-ui/react';

import DashboardCards from '../component/dashboard/DashboardCards';
import DashboardSort from '../component/dashboard/DashboardSort';
import DashboardCreator from '../component/dashboard/DashboardCreator';
import DashboardLoader from '../component/loaders/DashboardLoader';
import EmptyDashBoard from '../component/dashboard/EmptyDashBoard';
import Pagination from '../component/Pagination';


export const MYTASKS = gql`
query Mytasks($curPage: Int!, $perPage: Int!, $fieldOrder: String!, $sort: String!) {
  Mytasks(curPage: $curPage, perPage: $perPage, fieldOrder: $fieldOrder, sort: $sort) {
    tasks {
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
    curPage
    maxPage
    taskCount
  }
}
`;

const Dashboard = () => {
   
  const [searchParams] = useSearchParams();
  const curPage = searchParams.get('curPage')
  const perPage = searchParams.get('perPage')
  const fieldOrder = searchParams.get('fieldOrder')
  const sort = searchParams.get('sort')

  const navigate = useNavigate();

  const token = Cookies.get('carelulu');

  const [mytasks,{ data }] = useLazyQuery(
    MYTASKS,
    {   
       variables:{
          curPage:parseInt(curPage) || 1,
          perPage:parseInt(perPage) || 4,
          fieldOrder:fieldOrder || "createdAt",
          sort: sort || "DESC"
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
                console.log(error)
             }
        }
       
    }
  )
  
  useEffect(() => {
    if(token){
         mytasks()
    }
    if(token  && curPage && perPage && fieldOrder && sort ) {
      mytasks()
    }

 }, [token,mytasks,navigate,sort,fieldOrder,perPage,curPage])




  return (
    <>
    <Helmet title={'Dashboard'}>
      <body id={'dashboard'}></body>
    </Helmet>
    <Stack
        maxW={'960px'}
        mx="auto"
        minH={"80vh"}
        spacing={8}
        px={2}
        mb={5}
      > 
      
        <DashboardCreator />
        <DashboardSort/>
        {
          data?.Mytasks.tasks.length < 1 ? 
          <EmptyDashBoard/>
          :
          data ?
          <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)']}  gap={3}>
          {
            data?.Mytasks.tasks.map(i=>(
              <DashboardCards
               key={i.id}
               details={i}
              />
            ))
          }
        </Grid>
        :
         <DashboardLoader/>
        }
        
       { 
       data?.Mytasks.maxPage > 1 &&
       <Pagination  
          marginPages={2}
          pageRange={2}
          initialPage={data?.Mytasks.curPage -1}
          pageCount={data?.Mytasks.maxPage}
        />
        }


        

        
      </Stack>
 
    </>
      
  )
}

export default Dashboard