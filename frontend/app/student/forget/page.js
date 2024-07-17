"use client";
import { forgetPassword } from '@/store/Action/action';
import { RemoveError, removeMessage } from '@/store/Reducers/controlreducers';
import { Alert, AlertTitle, TextField } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
  const [alert, setalert] = useState("");
  const [active, setactive] = useState(false);
  const [Email, setemail] = useState("")
  const dispatch = useDispatch();
  const router = useRouter()
  const { message,error,isAuthenticated } = useSelector((state) => state.counterReducer);
  const handleMail = (e)=>{
    e.preventDefault()
    if(Email !== ""){
      const email = {
        email:Email
      }
      dispatch(forgetPassword(email))
    }
    else{
      setactive(true)
      setalert("Please fill the vaild Email")
    }
  }
  useEffect(() => {
    // dispatch(call())
    
    if(error.length !== 0){
      error.map((e)=>(
        setactive(true),
        setalert(e)
      ))


    }
    
    if(message){
    setemail("")
    setTimeout(() => {
      dispatch(removeMessage())
      router.push("/student/auth")
    }, 1000);
    }
  }, [error,message]);

  return (
    <>
    <div className="flex flex-col h-screen w-full relative items-center justify-center gap-7" >
        <img src={`/forget.svg`} className='h-28 w-28 object-contain' alt="" />
        <h1 className='text-black font-[poppins] font-bold text-4xl'>Forgot your password ?</h1>
        <h3 className='w-[30%] text-l text-center'>Please enter the email address associated with your account and We will email you a link to reset your password.</h3>
        {active ? (
          <Alert severity="warning" className="w-1/2">
            <AlertTitle>Alert</AlertTitle>
            <strong>{alert}</strong>
          </Alert>
        ) : (
          ""
        )}
        {
          message ?  <Alert severity="success">Message sent successfully to your mail. Please check your mail.</Alert>:""
        }
       
        <form onSubmit={handleMail} className='w-[60%] flex flex-col gap-4 items-center justify-center'>
        <TextField
            id="outlined-basic"
            value={Email}
            onChange={(e)=>setemail(e.target.value)}
            label="Email"
            type="email"
            variant="outlined"
            className='w-1/2 rounded-xl'
            // required
          />
             <button className="w-1/2 p-4 transition-all ease-linear duration-150 font-[poppins] text-white bg-black rounded-xl hover:opacity-80  font-semibold">
            Send Request
          </button>
        </form>
    <Link href={"/student/login"}
            onClick={()=> dispatch(RemoveError())}
   
   >
    <div className="flex gap-1 items-center justify-center hover:gap-2 cursor-pointer ease-in-out duration-200">
  {/* <i class="ri-arrow-drop-left-line text-2xl h-fit w-fit font-light text-center"></i> */}
  <i className="ri-arrow-left-line"></i>
  <h3 className='h-ull h-full text-center'>Return to sign in</h3>
</div>
    </Link>
    </div>
    </>
  )
}

export default page