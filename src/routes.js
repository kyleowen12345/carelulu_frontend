import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PageBaseUrl } from "./utils/urlbase";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";

import Header from './component/header/index'
import Footer from './component/footer/index'

export default function AppRoutes() {
    return (
        <>
           <BrowserRouter>
                <Routes>

                    <Route
                       path={PageBaseUrl.Homepage}
                       element={
                        <>
                        <Header/>
                        <Home/>
                        <Footer/>
                        </>
                       
                      }
                     />

                     <Route
                       path={PageBaseUrl.Auth.Login}
                       element={
                        <>
                        <Header/>
                        <Login/>
                        <Footer/>
                        </>
                       
                      }
                     />

                      <Route
                       path={PageBaseUrl.Auth.Register}
                       element={
                       <>
                        <Header/>
                        <Register/>
                        <Footer/>
                       </>
                      }
                     />
                    
                    {/* Protected Routes */}

                    <Route
                       path={PageBaseUrl.Dashboard}
                       element={<Dashboard/>}
                     />
                     <Route
                       path={PageBaseUrl.Task}
                       element={<Task/>}
                     />
                      
                </Routes>
           </BrowserRouter>
        </>
    )
}