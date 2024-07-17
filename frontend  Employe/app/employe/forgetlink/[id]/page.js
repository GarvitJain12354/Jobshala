"use client";
import React, { useEffect, useState } from 'react'
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Alert, AlertTitle, IconButton } from '@mui/material';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '@/store/Action/action';
import { useRouter } from 'next/navigation';
import { isError } from '@/store/Reducers/controlreducers';
const page = () => {
  const { message,error,isAuthenticated } = useSelector((state) => state.counterReducer);

const [password, setpassword] = useState("");
const [confirmpassword, setconfirmpassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);
const [active, setactive] = useState(false);
const [alert, setalert] = useState("")
const {id} = useParams();
const dispatch = useDispatch();
const router = useRouter()
const handelSubmit = (e)=>{
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
if(password === confirmpassword){
    const pass  = {
        password:password
    }
    if(!password.match(passwordRegex)){
      return dispatch(isError("Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number"))
    }
dispatch(changePassword(id,pass))
}
else{
    setactive(true)
    setalert("Confirm Password should be same as New Password")
    setpassword("")
    setconfirmpassword("")
}

};
useEffect(() => {

    if(error.length !== 0){
        error.map((e)=>(
          setactive(true),
          setalert(e)
        ))}
     if(message){
        setpassword("");
        setconfirmpassword("");
        setTimeout(() => {
            router.push("/employe/auth")   
        }, 1000);
     } 
}, [error,message])

const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
  <>
  <div className="flex flex-col  gap-6 items-center justify-center h-screen w-full">
    <img className='h-24 w-24' src={`/forgetpass.svg`} alt="" />
    <h1 className='text-5xl font-semibold'>Request sent successfully!</h1>
    <h3>Please change your password.</h3>
    {active ? (
          <Alert severity="warning" className="w-1/2">
            <AlertTitle>Alert</AlertTitle>
            <strong>{alert}</strong>
          </Alert>
        ) : (
          ""
        )}
       {
          message ?  <Alert severity="success">Password Changed Successfully</Alert>:""
        }  
    <form onSubmit={handelSubmit} className='flex flex-col items-center justify-center gap-4 w-[25%]'>
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

          <button className="w-fit p-4 transition-all ease-linear duration-150 font-[poppins] text-white bg-black rounded-xl hover:opacity-80  font-semibold">
          Update Password
          </button>
    </form>
  </div>
  
  </>
  )
}

export default page