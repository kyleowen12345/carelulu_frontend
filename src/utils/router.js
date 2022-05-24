import React, { useState, useEffect } from 'react';

import { Navigate, matchPath, useLocation, useNavigate} from "react-router-dom";


const PrivateRoute = ({children}) => {
    let token = localStorage.getItem("token");

    const [ Authenticated, SetAuthentication ] = useState(false);
    
}