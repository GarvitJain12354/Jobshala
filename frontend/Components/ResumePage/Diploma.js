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
import { deleteDiploma, deleteEducation, deleteSchool, deleteSecondary, editDiploma, editEducation, editSchool, editSecondary, getResume, uploadDiploma, uploadEducation, uploadScholl, uploadSchool, uploadSecondary } from "@/store/Action/action";
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
const Diploma = ({setsecondary,open}) => {
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.counterReducer
  );
  const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
const [opendiploma, setopendiploma] = useState(false)
const [College, setCollege] = useState("");
const [start, setstart] = useState("")
const [end, setend] = useState("");
const [degree, setdegree] = useState("")
const [stream, setstream] = useState("");
const [percentage, setpercentage] = useState("");
const [performance, setperformance] = useState("")
const [alert, setalert] = useState("")
const [diplomaid, setdiplomaid] = useState("")
const [secid, setsecid] = useState("")


const startyear = []
for (let index = 1980; index < 2025; index++) {
  startyear.push(index)
  
}
const endyear = []
for (let index = 1980; index < 2030; index++) {
  endyear.push(index)
  
}
useEffect(() => {
  user?.resume.diploma?.map((dets)=>(
     setCollege(dets?.college || ""),
    setstart(dets?.start || ""),
    setend(dets?.ending || ""),
    setstream(dets?.branch || ""),
    setperformance(dets?.performance || ""),
    setpercentage(dets?.percentage || "")

  ))
}, [user])

  
 const handelperformance = (e)=>{
    setperformance(e.target.value)
     }

 const educationSubmit = (e)=>{

  e.preventDefault()
    if(College === ""){
        return toast.error("College name is required");
  }
 
  if(start === ""){
        return toast.error("Starting date  is required");
  }
  if(end === ""){
        return toast.error("ending date  is required");
  }
  if(stream === ""){
    return toast.error("Stream  is required");
}
const info = {
    name:"Diploma",
  college:College,
  start:start,
  ending:end,
  branch:stream,
  percentage:percentage,
  performance:performance
}
// console.log("hello");
{user?.resume?.diploma?.length !== 0 ? dispatch(editDiploma(secid,info)) : dispatch(uploadDiploma(info))}
setsecondary(false)

}

const deleteeducation = (id)=>{
dispatch(deleteDiploma(id))
}
const editeducation = (id)=>{
setsecid(id)
  setsecondary(true)
}
  return (
    <>
            {user?.resume?.diploma.map((dets)=>(

<div className="flex flex-col">
          
<div className="flex w-full items-center justify-between">

    <h1 className="text-xl font-semibold text-black">
    {/* Senior Secondary (XII), Science */}
    {dets.name} , {dets?.branch}
  </h1> 
=

  <div className="icon flex items-center text-2xl gap-3 cursor-pointer">
    <i onClick={()=>editeducation(dets?.id)} className="ri-pencil-line"></i>
    <i onClick={()=>deleteeducation(dets?.id)} className="ri-delete-bin-7-line"></i>
  </div>
</div>
<h3 className="text-sm">{dets?.college}</h3>
<h3 className="text-sm">{dets?.start} - {dets?.ending}</h3>
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
        <DialogTitle className="w-full text-center text-black text-2xl font-semibold">{"Diploma details"}</DialogTitle>
        <DialogContent>
          
          <DialogContentText id="alert-dialog-slide-description">
       <form onSubmit={educationSubmit}>
       <div className="grid grid-cols-2 items-center place-items-center gap-1">
         <div className="flex items-start flex-col justify-center w-[30vw] gap-3 p-2 ml-auto ">
        <h1>College</h1>
        <TextField
              id="outlined-basic"
 value={College}
 onChange={(e)=>setCollege(e.target.value)}
              // label="First Name"
              placeholder="eg. Hindu College"
              type="text"
              variant="outlined"
              className='rounded-3xl w-[50vw]   hover:border-indigo-300'
              // required
            />
      </div>
      <span></span>
      <div className="flex  items-start flex-col gap-3 p-2 w-full  ">
      <Box sx={{width:"100%"}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Start Year</InputLabel>
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
      <div className="flex  items-start flex-col gap-3 p-2 w-full pl-4 ">
      <Box sx={{width:"100%"}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">End Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={end}
          label="Age"
          onChange={(e)=>setend(e.target.value)}

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
           {endyear.slice()
    .reverse().map((year, ind) => (
    <MenuItem key={ind} value={year}>
      {year}
    </MenuItem>
  ))}
        </Select>
      </FormControl>
    </Box>
      </div>
  
      <div className="flex items-start flex-col justify-center w-full gap-3 p-2 ">
        <h1>Stream <span className="text-xs">(optiopnal)</span></h1>
        <TextField
              id="outlined-basic"
              onChange={(e)=>setstream(e.target.value)}
              value={stream}
 
              // label="First Name"
              placeholder="eg. Economics"
              type="text"
              variant="outlined"
              className='rounded-3xl w-full  hover:border-indigo-300'
              // required
            />
      </div>
      <span></span>
     
      <div className="flex items-start flex-col justify-center w-full gap-3 p-2 ">
        <h1>Performance Scale <span className="text-xs">(optiopnal)</span></h1>
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
         </div>
         <div className="w-full  flex items-center justify-center pt-4">
         {/* <button className="p-4 px-8 bg-blue-600 font-bold text-white rounded-xl">Save</button> */}
         <Button variant="contained" type="submit" className="px-10" style={{ backgroundColor: 'rgb(25, 118, 210)', color: 'white' }}>
          {user?.resume?.diploma?.length !== 0 ? "Update" : "Save" }
          
          
          </Button>
         </div>
       </form>
          </DialogContentText>
        </DialogContent>

      </EducationDialog>
    </>
  );
};

export default Diploma;
