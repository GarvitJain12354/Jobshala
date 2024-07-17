"use client";
import { forgetPassword, resetpassword } from '@/store/Action/action';
import { RemoveError, isError, removeMessage } from '@/store/Reducers/controlreducers';
import { Alert, AlertTitle, IconButton, TextField } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

const page = () => {
  const [alert, setalert] = useState("");
  const [active, setactive] = useState(false);
  const [password, setpassword] = useState("");
const [confirmpassword, setconfirmpassword] = useState("");
const [oldpassword, setoldpassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showold, setshowold] = useState(false)
  const [showconfirm, setshowconfirm] = useState(false)
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleClickShowOldPassword = () => setshowold((show) => !show);
const handleClickShowConfirmPassword = () => setshowconfirm((show) => !show);
const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();
  const router = useRouter()
  const { message,error,isAuthenticated } = useSelector((state) => state.counterReducer);

  useEffect(() => {
    
    if(error.length !== 0){
      error.map((e)=>(
        setactive(true),
        setalert(e)
      ))


    }
    
    if(message){
    setpassword("");
    setconfirmpassword("");
    setoldpassword("")
    setTimeout(() => {
      dispatch(removeMessage())
      router.push("/employe/homepage")
    }, 2000);
    }
  }, [error,message]);
const handlechangepassword = (e)=>{
e.preventDefault();
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

if(oldpassword === password || oldpassword === confirmpassword){
    setpassword("");
    setoldpassword("")
    setconfirmpassword("")
    return dispatch(isError("Old and New Password should not be samme")) ;
}
if(oldpassword === "" || password === "" || confirmpassword === ""){
    return dispatch(isError("All fields are required")) ;
}
if(password !== confirmpassword){
    return setalert("Confirm Password should be same as New Password");
}
if(!password.match(passwordRegex)){
    return dispatch(isError("Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number"))
  }
  const pass = {
    oldpassword:oldpassword,
    newpassword:password
  }
dispatch(resetpassword(pass));
}
  return (
    <>
    <div className="flex flex-col h-screen w-full relative items-center justify-center gap-7" >
        <img src={`/forget.svg`} className='h-28 w-28 object-contain' alt="" />
        <h1 className='text-black font-[poppins] font-bold text-4xl'>Change your password </h1>
        <h3 className='w-[30%] text-l text-center'>Please enter the valid password associated with your account .</h3>
        {active ? (
          <Alert severity="warning" className="w-1/2">
            <AlertTitle>Alert</AlertTitle>
            <strong>{alert}</strong>
          </Alert>
        ) : (
          ""
        )}
        {
          message ?  <Alert severity="success">Password Changed Successfully.</Alert>:""
        }
       
        <form onSubmit={handlechangepassword} className='w-1/2 flex flex-col gap-4 items-center justify-center'>
        <FormControl className="w-full" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
             Old Password
            </InputLabel>
            <OutlinedInput
              value={oldpassword}
              onChange={(e)=>setoldpassword(e.target.value)}
              id="outlined-adornment-password"
              type={showold ? "text" : "password"}
              // required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    className="ease-in duration-1000	"
                  >
                    {showold ? (
                      <i className="ri-eye-line"></i>
                    ) : (
                      <i className="ri-eye-close-line"></i>
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>
        <FormControl className="w-full" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              // required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    className="ease-in duration-1000	"
                  >
                    {showPassword ? (
                      <i className="ri-eye-line"></i>
                    ) : (
                      <i className="ri-eye-close-line"></i>
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>
          <FormControl className="w-full" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
             Confirm New Password
            </InputLabel>
            <OutlinedInput
              value={confirmpassword}
              onChange={(e)=>setconfirmpassword(e.target.value)}
              id="outlined-adornment-password"
              type={showconfirm ? "text" : "password"}
              // required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    className="ease-in duration-1000	"
                  >
                    {showconfirm ? (
                      <i className="ri-eye-line"></i>
                    ) : (
                      <i className="ri-eye-close-line"></i>
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>
             <button className="w-1/2 p-4 transition-all ease-linear duration-150 font-[poppins] text-white bg-black rounded-xl hover:opacity-80  font-semibold">
           Change Password
          </button>
        </form>
    <Link href={"/employe/homepage"}
            onClick={()=> dispatch(RemoveError())}
   
   >
    <div className="flex gap-1 items-center justify-center hover:gap-2 cursor-pointer ease-in-out duration-200">
  {/* <i class="ri-arrow-drop-left-line text-2xl h-fit w-fit font-light text-center"></i> */}
  <i className="ri-arrow-left-line"></i>
  <h3 className='h-ull h-full text-center'>Return to Home</h3>
</div>
    </Link>
    </div>
    </>
  )
}

export default page