import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useAuth } from '../authcontext/authcontext';

const Screen = () => {
    const { authUser } = useAuth();
    

    return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header signIn = "" newacc = "" />
        <div>{authUser.email}</div>
        
    </div>
  )
}

export default Screen
