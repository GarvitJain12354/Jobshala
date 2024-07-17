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
const Nav = () => {
    const dispatch = useDispatch();
  const { message,error,isAuthenticated,user } = useSelector((state) => state.counterReducer);

    const router = useRouter()

//   useEffect(() => {

// if(!isAuthenticated) router.push("/student/auth")
//   }, [isAuthenticated])
  useEffect(() => {
    
dispatch(getstudent());
  }, [])

  
    
  return (
    <>
     
        <div className="flex absolute top-0 left-0 w-full  items-center justify-between  px-28 py-6 " >
     
        <h2 className='text-black font-bold tracking-wider'>
            <span className='text-blue-500 font-[poppins]'>
              INTERNSHIP
            </span>
            WALLAH
          </h2>
      
        <div className="flex items-center font-semibold justify-center gap-8 cursor-pointer">
       
          <Link href={"/employe/post"}><h2>Post Internships/Jobs</h2></Link>
     <BookmarkBorderIcon className='hover:text-blue-500 cursor-pointer ease duration-500'/>
     <AllInboxIcon className='hover:text-blue-500 cursor-pointer ease duration-500'/>
{/*     
   <div className={`bg-${Boolean(anchorEl) ? 'blue-100' : 'transparent'} ease-linear cursor-pointer duration-200 p-2 rounded-md`}>
   {user ? (
          <Avatar onClick={handleClick} alt={user?.firstname} src={user?.avatar.url}  />
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}
   </div> */}
  <Drawer user={user}></Drawer>
      {/* <Popover
        id="dropdown-menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
         
        }}
        className='backdrop-blur-3xl	'
        style={{backgroundColor:"rgba(255, 255, 255, 0.221)"}}
      
      >
        <List className='px-0'>
          <ListItem >
            <ListItemButton onClick={handleClose} className='flex flex-col items-start gap-1 justify-start'>
             <h1>{user?.firstname} {user?.lastname}</h1> 
             <h4>{user?.email}</h4>
             <hr className='w-full bg-gray-500 mt-3 shrink-0' />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton onClick={handleClose}>
             <Link href={"#"}>
             Home
             </Link>
             <Link href={"#"}></Link>
             <Link href={"#"}></Link>
             <Link href={"#"}></Link>
             <Link href={"#"}></Link>
             <Link href={"#"}></Link>
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton onClick={handleClose}>
              <a href="#" className="dropdown-item">
                Something else here
              </a>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover> */}
        </div>
        </div>
  
    </>
 
  )
}

export default Nav;