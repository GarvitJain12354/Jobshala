"use client";
import Nav from "@/Components/Nav/Nav";
import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  DialogContentText,
  Divider,
  ListItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Slide from "@mui/material/Slide";
import { toast } from "react-toastify";
import { deleteIntern, deleteJob, uploadIntern, uploadJob } from "@/store/Action/action";

import EditIntern from "./EditIntern";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const Transitionedu = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TopDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      top: "50px", // Adjust the value as needed
      position: "absolute",
      width:'50vw',
      padding:'3vw'
    },
  },
}));
const EducationDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
   
    [theme.breakpoints.up("sm")]: {
   
      width:'50vw',
      padding:'1vw'
    },
  },
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    height: "calc(100% - 64px)", // Adjust this value as needed
    overflowY: "scroll",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Intern = () => {
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.counterReducer
  );
  const dispatch = useDispatch();
 
  const [open, setOpen] = useState(false);
const [profile, setprofile] = useState("");
const [organization, setorganization] = useState("");
const [location, setlocation] = useState("");
const [start, setstart] = useState("")
const [end, setend] = useState("");
const [discription, setdiscription] = useState("")
const [active, setactive] = useState(false)
const [date, setdate] = useState(false)
const [data, setdata] = useState([])
const [openEdit, setopenEdit] = useState(false)
const handleChange = (event) => {
  setAge(event.target.value);
};



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handelwork = () => {
   setactive(!active)
   
  };
  const handeldate = ()=>{
setdate(!date)
  }
 useEffect(() => {
  if(active === true){
    setlocation("Work from home")
   }
   else{
    setlocation("")
   }
   if(date === true){
    setend("Present")
   }
   else{
    setend("")
   }
 }, [active,date])
 

const educationSubmit = (e)=>{
  e.preventDefault();
  
  if(profile === ""){
        return toast.error("Profile name is required");
  }
 
  if(start === ""){
        return toast.error("Starting date name is required");
  }
  if(end === ""){
        return toast.error("ending date name is required");
  }
  if(organization === ""){
    return toast.error("Degree  is required");
}
if(location === ""){
  return toast.error("Degree  is required");
}
const info = {
 profile:profile,
 organization:organization,
 location:location,
 start:start,
 end:end,
 discription:discription
}

dispatch(uploadIntern(info))
setOpen(false)

// dispatch(uploadEducation(info))
}

const deleteeducation = (id)=>{

dispatch(deleteIntern(id))
}
const editeducation = (index)=>{

  setdata(user?.internship?.jobs[index]);
  setopenEdit(true)
}

  return (
    <>
      <div className="flex  gap-2 py-6">
        <div className="flex gap-6 items-start ">
          <h1 className="text-md font-normal w-24 mt-6">Internship</h1>
        </div>
        <div className="flex flex-col gap-1 p-6 px-16 w-[80%] ">
        {user?.resume?.internship.map((dets,index)=>(

<div className="flex flex-col">
          
<div className="flex w-full items-center justify-between">
 
    <h1 className="text-xl font-semibold text-black">
    {/* Senior Secondary (XII), Science */}
    {dets?.profile}
  </h1> 

  <div className="icon flex items-center text-2xl gap-3 cursor-pointer">
    <i onClick={()=>editeducation(index)} className="ri-pencil-line"></i>
    <i onClick={()=>deleteeducation(dets?.id)} className="ri-delete-bin-7-line"></i>
  </div>
</div>
<h3 className="text-sm">{dets?.organization},{dets?.location}</h3>
<h3 className="text-sm">{dets?.start} - {dets?.end}</h3>
{/* <h3 className="text-sm">Year of completion:2022</h3> */}
<h3>{dets.discription}</h3>

</div>
))}

          <div
            onClick={handleClickOpen}
            className="flex text-blue-600 font-normal cursor-pointer font-[poppins]  gap-2 mt-3 "
          >
            <i className="ri-add-fill"></i> Add Jobs
          </div>
        </div>
      </div>

      <Divider />

      <EducationDialog
        open={open}
        TransitionComponent={Transitionedu}
        keepMounted
        onClose={()=>setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        
        className="overflow-x-hidden"
      
      >
        <DialogTitle className="w-full text-center text-black text-2xl font-semibold">{"Internship Details"}</DialogTitle>
        <DialogContent>
          
          <DialogContentText style={{ overflowX: 'hidden' }} id="alert-dialog-slide-description">
       <form onSubmit={educationSubmit}>
       <div className="grid grid-cols-2 items-center place-items-center gap-1">
         <div className="flex items-start flex-col justify-center w-[30vw] gap-3 p-2 ml-auto ">
        <h1>Profile</h1>
        <TextField
              id="outlined-basic"
 value={profile}
 onChange={(e)=>setprofile(e.target.value)}
              // label="First Name"
              placeholder="eg. Operations"
              type="text"
              variant="outlined"
              className='rounded-3xl w-full   hover:border-indigo-300'
              // required
            />
      </div>
      <span></span>
      <div className="flex items-start flex-col justify-center w-[30vw] gap-3 p-2 ml-auto ">
        <h1>Organisations</h1>
        <TextField
              id="outlined-basic"
 value={organization}
 onChange={(e)=>setorganization(e.target.value)}
              // label="First Name"
              placeholder="eg. Sheryians Coding School"
              type="text"
              variant="outlined"
              className='rounded-3xl w-full   hover:border-indigo-300'
              // required
            />
      </div>
      <span></span>
      <div className="flex items-start flex-col justify-center w-[30vw] gap-3 p-2 ml-auto ">
        <h1>Location</h1>
        <TextField
              id="outlined-basic"
 value={location}
 onChange={(e)=>
  {!active ?setlocation(e.target.value) : ""}
  }
              // label="First Name"
              placeholder="eg. Sheryians Coding School"
              type="text"
              variant="outlined"
              className='rounded-3xl w-full   hover:border-indigo-300'
              // required
            />
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" onChange={handelwork} />
          Is work from home.
          </div>     
      </div>
      <span></span>
      <div className="flex items-start flex-col justify-center w-full gap-3 pr-6 p-2 ml-auto ">
        <h1>Start Date</h1>
        <TextField
              id="outlined-basic"
 value={start}
 onChange={(e)=>setstart(e.target.value)}
              // label="First Name"
              // placeholder="eg. Sheryians Coding School"
              type="date"
              variant="outlined"
              className='rounded-3xl w-full  hover:border-indigo-300'
              // required
            />
         
      </div>
      <div className="flex items-start flex-col justify-center w-full pl-6 gap-3 p-2 ml-auto ">
        <h1>End Date</h1>
        <TextField
              id="outlined-basic"
 value={end}
 
 onChange={(e)=>
  {date ? "":

  setend(e.target.value)
}
}
              // label="First Name"
              // placeholder="eg. Sheryians Coding School"
              type={date ? "text" :"date"}
              variant="outlined"
              className='rounded-3xl w-full   hover:border-indigo-300'
              // required
            />
           
      </div>
      <span></span>
      <div className="flex w-full items-center pl-6 gap-2">
          <input type="checkbox" name="" id="" onChange={handeldate} />
          Currently work from home.
          </div>  
      <div className="flex flex-col ml-auto items-start w-[42vw] gap-4">
         <h1>Description <span className="text-xs">(optional)</span></h1>
         <textarea name="" value={discription} onChange={(e)=>setdiscription(e.target.value)} className="w-full border-2 p-4 rounded-lg h-56" style={{resize:"none"}} id="" cols="30"  rows="10"></textarea>
         <h3 className="ml-auto">{discription.length}/250</h3>
      </div>
         </div>
         <div className="w-full  flex items-center justify-center pt-4">
         {/* <button className="p-4 px-8 bg-blue-600 font-bold text-white rounded-xl">Save</button> */}
         <Button variant="contained" type="submit" className="px-10" style={{ backgroundColor: 'rgb(25, 118, 210)', color: 'white' }}>
          Save
          
          
          </Button>
         </div>
       </form>
          </DialogContentText>
        </DialogContent>

      </EducationDialog>

<EditIntern open={openEdit} setOpen={setopenEdit} data={data}/>
 
    </>
  );
};

export default Intern;
