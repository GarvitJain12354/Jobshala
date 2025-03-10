"use client";

import { Alert, AlertTitle, IconButton } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import lottie from "lottie-web";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { defineElement } from "lord-icon-element";
import { useDispatch, useSelector } from "react-redux";
import { call, getstudent, signinStudent } from "@/store/Action/action";
import { useRouter } from "next/navigation";
import { RemoveError, isError } from "@/store/Reducers/controlreducers";

const Login = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setalert] = useState("");
  const [active, setactive] = useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { message,error,isAuthenticated } = useSelector((state) => state.counterReducer);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handelEmail = (e) => {
    setemail(e.target.value);
    setactive(false);
  };
  const handelPassword = (e) => {
    setpassword(e.target.value);
    setactive(false);
  };
const router = useRouter()
  const formSubmit = (e) => {
    e.preventDefault();
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (email !== "" && password !== "") {
      // if(!password.match(passwordRegex)){
      //   return dispatch(isError("Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number"))
      // }
      const info = { email, password };
    
      dispatch(signinStudent(info));
 
    } else {
      setactive(true);
      if (email === "") {
        setalert("Email is required");
      }
      if (password === "") {
        setalert("Password is required");
      }
      if (email === "" && password === "") {
        setalert("Email & Password is required");
      }
    }
  };
  useEffect(() => {
    // dispatch(call())
    dispatch(getstudent())
    if(error.length !== 0){
      error.map((e)=>(
        setactive(true),
        setalert(e)
      ))


    }
    if(isAuthenticated){
      router.push("/student/auth")
    }
    console.log(isAuthenticated);

  }, [message,error,isAuthenticated]);

  return (
    <div className="w-full flex  items-center justify-center h-screen">
      <div className="side h-full flex-col  w-fit p-4 flex items-center justify-center max-lg:hidden ">
        <h1 className="text-5xl font-[poppins]">Hi , Welcome Back 👋</h1>
        <img
          src={"/login.png"}
          className="h-[70%] object-center object-contain"
          alt=""
        />
      </div>
      <div className="h-full w-1/2 max-lg:w-full  relative flex flex-col items-center gap-6 justify-center">
        <h1 className=" text-4xl whitespace-nowrap font-bold font-[poppins]">
          Sign in to Internshala
        </h1>
        <h3 className="w-1/2 max-lg:w-full max-lg:text-center text-left">
          New user?
          <Link
            href="/student/register"
            className="ml-3 text-green-600 font-normal font-[poppins]"
            onClick={()=> dispatch(RemoveError())}
          >
            Create an account
          </Link>
        </h3>
        {active ? (
          <Alert severity="warning" className="w-1/2">
            <AlertTitle>Alert</AlertTitle>
            <strong>{alert}</strong>
          </Alert>
        ) : (
          ""
        )}

        <form autoComplete="false" className="grid gap-8 w-1/2 " onSubmit={formSubmit}>
          <TextField
            id="outlined-basic"
            value={email}
            onChange={handelEmail}
            label="Email"
            type="email"
            variant="outlined"
            // required
          />
          <FormControl className="w-full" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              value={password}
              onChange={handelPassword}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
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
              label="Password"
            />
          </FormControl>

          <Link
            href="/student/forget"
            className="text-black fs-xl w-full text-right font-[poppins]"
            onClick={()=> dispatch(RemoveError())}

          >
            Forget Password ?
          </Link>
          <button className="w-full p-4 transition-all ease-linear duration-150 font-[poppins] text-white bg-black rounded hover:opacity-80  font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
