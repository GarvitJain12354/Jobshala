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
import { deleteDiscription, deleteJob, deleteskills, uploadDiscription, uploadJob, uploadskills } from "@/store/Action/action";
import EditSkills from "./EditSkills";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const Transitionedu = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
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
const Skills = () => {
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
const [skill, setskill] = useState("")
const [rate, setrate] = useState("")
const [openEdit, setopenEdit] = useState(false)
const [data, setdata] = useState([]);
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


const educationSubmit = (e)=>{
  e.preventDefault();
  
  if(skill === ""){
        return toast.error("Skill name is required");
  }
   
  if(rate === ""){
    return toast.error("Skill rating is required");
}
const info = {
skill:skill,
rate:rate
}

dispatch(uploadskills(info))
setOpen(false)
}

const deleteeducation = (id)=>{

dispatch(deleteskills(id))
}
const editeducation = (index)=>{

  setdata(user?.resume?.skills[index]);
  setopenEdit(true)
}

  return (
    <>
      <div className="flex  gap-2 py-6">
        <div className="flex gap-6 items-start ">
          <h1 className="text-md font-normal w-24 mt-6">Skills</h1>
        </div>
        <div className="flex flex-col w-full">
        <div className="grid grid-cols-2 place-items-center gap-1 p-6 px-16 w-[80%] ">
        {user?.resume?.skills.map((dets,index)=>(

<div className="flex flex-col w-full">
          
<div className="flex w-full items-center justify-between">
<h1  className='text-xl font-medium '>{dets.skill}</h1>
  <div className="icon flex items-center text-2xl gap-3 cursor-pointer">
    <i onClick={()=>editeducation(index)} className="ri-pencil-line"></i>
    <i onClick={()=>deleteeducation(dets?.id)} className="ri-delete-bin-7-line"></i>
  </div>
</div>
<h3>{dets?.rate}</h3>
{/* <h3 className="text-sm">Year of completion:2022</h3> */}


</div>
))}

  
        </div>
        <div
            onClick={handleClickOpen}
            className="flex text-blue-600 font-normal cursor-pointer font-[poppins]  gap-2 mt-3 ml-10"
          >
            <i className="ri-add-fill"></i> Add Skills
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
        <DialogTitle className="w-full text-center text-black text-2xl font-semibold">{"Skills Details"}</DialogTitle>
        <DialogContent>
          
          <DialogContentText style={{ overflowX: 'hidden' }} id="alert-dialog-slide-description">
       <form onSubmit={educationSubmit}>
       <div className="grid grid-cols-1 items-center place-items-center gap-1">
       <div className="flex flex-col ml-auto items-start w-[42vw] gap-4">
         <h1 className="text-black">Add skills </h1>
         <TextField
              id="outlined-basic"
              value={skill}
              onChange={(e)=>setskill(e.target.value)}
            //   label="State"
            placeholder="eg. Web developer"
              type="text"
              variant="outlined"
              className='rounded-3xl w-[80%] hover:border-indigo-300'
               // maxLength={6}
              // minLength={6}
              // onKeyDown={(evt) =>
              //   ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              // }
              // required
            />
          <h1 className="w-full text-black text-left  ">How do you rate your skill ?</h1>
          <div className="flex gap-2 items-center">
           <h3 className={`${rate === "Begginer" ? 'text-gray-400' : 'text-blue-600'  } cursor-pointer `} onClick={(e)=>setrate("Begginer")}>Begginer</h3>
          </div>
          <div className="flex gap-2 items-center">
        <h3 className={`${rate === "Intermidiate" ? 'text-gray-400' : 'text-blue-600'  } cursor-pointer `}  onClick={(e)=>setrate("Intermidiate")}>Intermidiate</h3>
          </div>
          <div className="flex gap-2 items-center">
          <h3 className={`${rate === "Advanced" ? 'text-gray-400' : 'text-blue-600'  } cursor-pointer `}  onClick={(e)=>setrate("Advanced")}>Advanced</h3>
          </div>
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

<EditSkills open={openEdit} setOpen={setopenEdit} data={data}/>
 
    </>
  );
};

export default Skills;
