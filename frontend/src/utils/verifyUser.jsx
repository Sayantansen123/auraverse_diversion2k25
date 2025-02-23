import React from "react";
import {Outlet , Navigate} from 'react-router-dom'
import { useAuth } from '../authcontext/authcontext' 

export const VerifyUser = ()=>{
    const {authUser} = useAuth();
    return authUser ? <Outlet/> : <Navigate to={'/login'}/>
}