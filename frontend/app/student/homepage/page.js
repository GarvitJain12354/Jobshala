"use client";
import React, { useEffect, useState } from 'react'
import { getstudent, signoutStudent } from '@/store/Action/action'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  Skeleton,

} from '@mui/material';
import Link from 'next/link';
import Drawer from "@/Components/Drawer/drawer"
import Nav from '@/Components/Nav/Nav';
const page = () => {
    const dispatch = useDispatch();
  const { message,error,isAuthenticated,user } = useSelector((state) => state.counterReducer);

    const router = useRouter()

  useEffect(() => {

if(!isAuthenticated) router.push("/student/auth")
  }, [isAuthenticated])
  useEffect(() => {
    
dispatch(getstudent());
  }, [])

  
    
  return (
    <>
       <div className='min-h-screen w-full '>
    <Nav/>
     
    </div>
    </>
 
  )
}

export default page;