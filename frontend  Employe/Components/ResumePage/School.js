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
import { deleteEducation, deleteSchool, deleteSecondary, editEducation, editSchool, editSecondary, getResume, uploadEducation, uploadScholl, uploadSchool, uploadSecondary } from "@/store/Action/action";
import { FortSharp, School } from "@mui/icons-material";
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
   
      width:'60vw',
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
const Scholl = ({setsecondary,open}) => {
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.counterReducer
  );
  const dispatch = useDispatch();
 
const [secid, setsecid] = useState("")
const [start, setstart] = useState("")
const [school, setschool] = useState("")
const [stream, setstream] = useState("");
const [percentage, setpercentage] = useState("");
const [performance, setperformance] = useState("")
const [board, setboard] = useState("")
const [alert, setalert] = useState("")
const [diplomaid, setdiplomaid] = useState("")

const [status, setstatus] = useState("");


const startyear = []
for (let index = 1980; index < 2025; index++) {
  startyear.push(index)
  
}
const endyear = []
for (let index = 1980; index < 2030; index++) {
  endyear.push(index)
  
}
useEffect(() => {
  user?.resume.school?.map((dets)=>(
     setstatus(dets?.status || ""),
     setboard(dets?.board || ""),
     setschool(dets?.school || ""),
     setstart(dets?.start || ""),
     setpercentage(dets?.percentage || ""),
     setperformance(dets?.performance || ""),
     setstream(dets?.stream || "")

  ))
}, [user])

  

 const handelperformance = (e)=>{
setperformance(e.target.value)
 }
const educationSubmit = (e)=>{
  e.preventDefault();
 
  if(board === ""){
    return toast.error("Board name is required");
}
  if(start === ""){
        return toast.error("Year of Completion is required");
  }
  if(school === ""){
    return toast.error("School name is required");
}

const info = {
secondary:"Secondary (X)",
  school:school,
  start:start,
  board:board,
 
  percentage:percentage,
  performance:performance,
  status:status
}
// console.log("hello");
{user?.resume?.school?.length !== 0 ? dispatch(editSchool(secid,info)) : dispatch(uploadSchool(info))}
setsecondary(false)
}

const deleteeducation = (id)=>{
dispatch(deleteSchool(id))
}
const editeducation = (id)=>{
setsecid(id)
  setsecondary(true)
}
  return (
    <>
          {user?.resume?.school?.map((dets)=>(

<div className="flex flex-col">
          
<div className="flex w-full items-center justify-between">
<h1 className="text-xl font-semibold text-black">
    {/* Senior Secondary (XII), Science */}
    {dets?.secondary}
  </h1>

  <div className="icon flex items-center text-2xl gap-3 cursor-pointer">
    <i onClick={()=>editeducation(dets?.id)} className="ri-pencil-line"></i>
    <i onClick={()=>deleteeducation(dets?.id)} className="ri-delete-bin-7-line"></i>
  </div>
</div>
<h3 className="text-sm">{dets?.school}</h3>

<h3 className="text-sm">{dets?.start} - {dets?.status}</h3>
{/* <h3 className="text-sm">Year of completion:2022</h3> */}
{dets?.percentage ?<h3 className="text-sm">CGPA:{dets?.percentage}/{dets?.performance}</h3> : ""}

</div>
))}

 

   
     


      <EducationDialog
        open={open}
        TransitionComponent={Transitionedu}
        keepMounted
        onClose={()=>setsecondary(false)}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl"
      
      >
        <DialogTitle className="w-full text-center text-black text-2xl font-semibold">{"Senior Secondary or Equivalent (XII) details"}</DialogTitle>
        <DialogContent>
          
          <DialogContentText id="alert-dialog-slide-description">
       <form onSubmit={educationSubmit}>
       <div className="grid grid-cols-2 items-center place-items-center gap-1">
         <div className="flex items-start flex-col justify-center w-[30vw] gap-3 p-2 ml-auto ">
      <h1>Intermediate status</h1>
   <div className="flex gap-6 cursor-pointer">
   <div className="flex gap-2">
     <input type="radio"  name="a" value={"Pursuing"} onChange={(e)=>setstatus(e.target.value)} />
     <h3>Pursuing</h3>
     </div>
     <div className="flex gap-2">
     <input type="radio" name="a" value={"Completed"} onChange={(e)=>setstatus(e.target.value)} />
     <h3>Completed</h3>
     </div>
   </div>
      </div>
      <span></span>
      <div className="flex  items-start flex-col gap-3 p-2 w-full">
        <h1>Year of Completion</h1>
      <Box sx={{width:"100%"}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={start}
          label="Age"
          onChange={(e)=>setstart(e.target.value)}

          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            getContentAnchorEl: null, // This ensures that the menu doesn't overlap with the select input
            PaperProps: {
              style: {
                maxHeight: 200, // Adjust the maxHeight as needed
              },
            },
          }}
        >
           {startyear.slice()
    .reverse().map((year, ind) => (
    <MenuItem key={ind} value={year}>
      {year}
    </MenuItem>
  ))}
        </Select>
      </FormControl>
    </Box>
      </div>
     <span></span>
     <div className="flex items-start flex-col justify-center w-full gap-3 p-2 ">
        <h3 >Board</h3>
        <TextField
              id="outlined-basic"
              onChange={(e)=>setboard(e.target.value)}
              value={board}
//  value={start}
              // label="First Name"
              placeholder="eg. CBSE"
              type="text"
              variant="outlined"
              className='rounded-3xl w-[40vw]  hover:border-indigo-300'
              // required
            />
      </div>
     <span></span>
     
      <div className="flex items-start flex-col justify-center w-full gap-3 p-2 ">
        <h1 >Performance Scale <span className="text-xs">(optiopnal)</span></h1>
        <Box sx={{width:"80%"}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Percentage</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={performance}
          label="Age"
          onChange={handelperformance}

          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            getContentAnchorEl: null, // This ensures that the menu doesn't overlap with the select input
            PaperProps: {
              style: {
                maxHeight: 80, // Adjust the maxHeight as needed
              },
            },
          }}
        >
        <MenuItem value={10}>CGPA (Scale of 10)</MenuItem>
        <MenuItem value={9}>CGPA (Scale of 9)</MenuItem>
        <MenuItem value={8}>CGPA (Scale of 8)</MenuItem>
        <MenuItem value={7}>CGPA (Scale of 7)</MenuItem>
        <MenuItem value={6}>CGPA (Scale of 6)</MenuItem>
        <MenuItem value={5}>CGPA (Scale of 5)</MenuItem>
        <MenuItem value={4}>CGPA (Scale of 4)</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </div>
      <div className="flex items-start flex-col justify-center w-full gap-3 p-2 ">
        <h1 > Performance <span className="text-xs">(optiopnal)</span></h1>
        <TextField
              id="outlined-basic"
              onChange={(e)=>setpercentage(e.target.value)}
              value={percentage}
 
              // label="First Name"
              placeholder="0.00"
              type="number"
              variant="outlined"
              className='rounded-3xl hover:border-indigo-300'
              // required
            />
      </div>
   
      <div className="flex items-start flex-col justify-center w-full gap-3 p-2 ">
        <h3 >School</h3>
        <TextField
              id="outlined-basic"
              onChange={(e)=>setschool(e.target.value)}
              value={school}
 
              // label="First Name"
              placeholder="eg. Delhi Public School"
              type="text"
              variant="outlined"
              className='rounded-3xl w-[40vw]  hover:border-indigo-300'
              // required
            />
      </div>
      <span></span>
         </div>
         <div className="w-full  flex items-center justify-center pt-4">
         {/* <button className="p-4 px-8 bg-blue-600 font-bold text-white rounded-xl">Save</button> */}
         <Button variant="contained" type="submit" className="px-10" style={{ backgroundColor: 'rgb(25, 118, 210)', color: 'white' }}>
          {user?.resume?.school?.length !== 0 ? "Update" : "Save" }
          
          
          </Button>
         </div>
       </form>
          </DialogContentText>
        </DialogContent>

      </EducationDialog>
    </>
  );
};

export default Scholl;
