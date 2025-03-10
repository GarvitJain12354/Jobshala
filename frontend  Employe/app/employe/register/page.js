export const metadata = {
  title: "Login | Student",
};
"use client";

import React, { useEffect, useState} from "react";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import Link from "next/link";
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
import {  getstudent, registerStudent } from "@/store/Action/action";
import { useRouter } from "next/navigation";
import { RemoveError, isError } from "@/store/Reducers/controlreducers";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [alert, setalert] = useState("");
  const [active, setactive] = useState(false);
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { message, error, isAuthenticated } = useSelector(
    (state) => state.counterReducer
  );
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
  const router = useRouter();
  const formSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (email !== "" && password !== "" && firstname !== "" && lastname !== "" && gender !== "") {
      if(firstname.length < 3){
return dispatch(isError("First name must contain atleat 3 characters"))
      }
      if(lastname.length < 4){
        return dispatch(isError("Last name must contain atleat 4 characters"))
      }
      if(!password.match(passwordRegex)){
        return dispatch(isError("Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number"))
      }
      const info = { 
        firstname,
        lastname,
        gender,
        email,
        password
       };
      console.log(info);
      dispatch(registerStudent(info));
    } else {
      setactive(true);
      
    
      
    
      
      if (password === "") {
        setalert("Password is required");
      }
      if (gender === "") {
        setalert("Gender is required");
      }
      if (email === "") {
        setalert("Email is required");
      }
      if (lastname === "") {
        setalert("Last Name is required");
      }
      if (firstname === "") {
        setalert("First Name is required");
      }
    //   if (email === "" && password === "") {
    //     setalert("Email & Password is required");
    //   }
    }
  };
  const handelFirstName = (e)=>{
    setfirstName(e.target.value)
    setactive(false)
    setalert("")
  }
  const handelLastName = (e)=>{
    setfirstName(e.target.value)
    setactive(false)
    setalert("")
  }
  useEffect(() => {
    // dispatch(call())
    dispatch(getstudent());
    if (error.length !== 0) {
      error.map((e) => (setactive(true), setalert(e)));
    }
    if (isAuthenticated) {
      router.push("/employe/auth");
    }
    console.log(isAuthenticated);
  }, [message, error, isAuthenticated]);

  return (
    <div className="w-full flex items-center justify-center  h-screen">
      <div className="side h-full flex-col  w-1/2 p-4 flex items-center justify-center max-lg:hidden ">
        <h1 className="text-3xl font-[poppins]">Get started absolutely free .</h1>
        <img
          src={"/register.avif"}
          className="h-[80%] object-center object-contain"
          alt=""
        />
      </div>
      <div className="h-full w-1/2 max-lg:w-full relative flex flex-col items-center gap-6 justify-center">
        <h1 className="leading-normal  text-4xl text-center whitespace-nowrap font-bold font-[poppins] max-lg:text-2xl ">
          How to get an internship <br /> with no experience ?
        </h1>
        <h2 className="text-center text-xl leading-relaxed max-md:text-lg">A student's guide to bagging your first gig.</h2>
        <h3 className="w-1/2 text-left max-md:text-center">
          Already have an account?
          <Link
            href="/employe/login"
            className="ml-3 text-green-600 font-normal font-[poppins]"
            onClick={()=> dispatch(RemoveError())}
          >
            Sign in
          </Link>
        </h3>
        {active ? (
          <Alert severity="warning" className="w-1/2 max-lg:w-[80%]">
            <AlertTitle>Alert</AlertTitle>
            <strong>{alert}</strong>
          </Alert>
        ) : (
          ""
        )}

        <form className="grid place-items-center	 gap-8 w-1/2 max-lg:w-[80%]" onSubmit={formSubmit}>
          <div className="flex items-center gap-4">
            <TextField
              id="outlined-basic"
              value={firstname}
              onChange={handelFirstName}
              label="First Name"
              type="text"
              variant="outlined"
              // required
            />
            <TextField
              id="outlined-basic"
              value={lastname}
              onChange={(e)=>setlastName(e.target.value)}
              label="Last Name"
              type="text"
              variant="outlined"
              // required
            />
          </div>
          <TextField
            id="outlined-basic"
            value={email}
            onChange={handelEmail}
            label="Email"
            type="email"
            variant="outlined"
            className="w-full"
            // required
          />
          <div className="flex gap-4 items-center justify-center w-full">
            <div
              onClick={() => {setgender("Male") ;
              setactive(false);
              setalert("")
            
              }}
              className={`flex cursor-pointer shrink-0 items-center justify-center h-fit gap-2 w-fit px-[1vw] rounded-3xl py-0 ${
                gender === "Male" ? " bg-slate-400" : "bg-slate-200"
              }`}
            >
              <img
                className="h-14 w-14 object-contain"
                src={`/male.svg`}
                alt=""
              />
              <h3>Male</h3>
            </div>
            <div
              onClick={() => {setgender("Female") ;
              setactive(false);
              setalert("")
            
              }}
              className={`flex cursor-pointer shrink-0 items-center justify-center h-fit gap-2 w-fit px-[1vw] rounded-3xl py-0 ${
                gender === "Female" ? " bg-slate-400" : "bg-slate-200"
              }`}
            >
              <img
                className="h-14  w-14 object-contain"
                src={`/female.png`}
                alt=""
              />
              <h3>Female</h3>
            </div>
            <div
            onClick={() => {setgender("Others") ;
            setactive(false);
            setalert("")
          
            }}
              className={`flex cursor-pointer shrink-0 items-center justify-center h-fit gap-2 w-fit px-[1vw] rounded-3xl py-0 ${
                gender === "Others" ? " bg-slate-400" : "bg-slate-200"
              }`}
            >
              <img
                className="h-12  w-12 object-contain"
                src={`/bisexual.png`}
                alt=""
              />
              <h3>Others</h3>
            </div>
          </div>
          <FormControl className="w-full" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              value={password}
              onChange={handelPassword}
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
              label="Password"
            />
          </FormControl>

          {/* <Link
              href="/student/forget"
              className="text-black fs-xl w-full text-right font-[poppins]"
            >
              Forget Password ?
            </Link> */}
          <button className="w-full p-4 transition-all ease-linear duration-150 font-[poppins] text-white bg-black rounded hover:opacity-80  font-semibold">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
