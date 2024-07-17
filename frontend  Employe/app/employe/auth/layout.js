"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const layout = ({children}) => {
    const {isAuthenticated} = useSelector((state)=>state.counterReducer)
    const router  = useRouter()
    useEffect(() => {
     if(!isAuthenticated) router.push("/employe/login")
    }, [])
    
  return children;
  
}

export default layout