import React, { useState, useEffect } from 'react';
import { gql, useQuery   } from '@apollo/client';

import { Navigate, useLocation, useNavigate} from "react-router-dom";
import {fetchUserVar} from '../App'
import Cookies from 'js-cookie'
import Loader from '../component/Loader';

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


const PrivateRoute = ({children}) => {

    const navigate = useNavigate();
    const token = Cookies.get('carelulu');

    const location = useLocation();

    const [ Authenticated, SetAuthentication ] = useState(false);


    const {  loading,refetch } = useQuery(
        FETCHUSER,
        {
            context:{
                headers:{
                    token:token || ""
                }
            },
            fetchPolicy:"cache-and-network ",
            onCompleted:data => {
                if(data){
                    // condition
                    fetchUserVar({
                        firstName:data?.fetchUser.firstName,
                        lastName:data?.fetchUser.lastName,
                        email:data?.fetchUser.email
                    })
                    SetAuthentication(true)
                }
            },
            onError:error => {
                 if(error){
                    SetAuthentication(false)
                    console.log(error)
                 }
            }
           
        }
      )

    useEffect(() => {
       if(token){
            refetch()
       }else{
           navigate('/login')
       }

    }, [token,refetch,navigate])

    return  loading ? 
    <Loader/>
    :
    (
        Authenticated ? children: <Navigate to="/login" state={{ from: location }} replace />
    )
    
    
    
}

export {PrivateRoute}