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
import { deleteDiscription, deleteJob, editDiscription, uploadDiscription, uploadJob } from "@/store/Action/action";
// import EditJob from "./EditJob";

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
const EditResponsibility = ({open,setOpen,data}) => {
  const { message, error, isAuthenticated, user } = useSelector(
    (state) => state.counterReducer
  );
  const dispatch = useDispatch();
 
const [profile, setprofile] = useState("");
const [organization, setorganization] = useState("");
const [location, setlocation] = useState("");
const [start, setstart] = useState("")
const [end, setend] = useState("");
const [discription, setdiscription] = useState("")
const [active, setactive] = useState(false)
const [date, setdate] = useState(false)
// const [data, setdata] = useState([])
// const [openEdit, setopenEdit] = useState(false)
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
  
  if(discription === ""){
        return toast.error("Description is required");
  }
 
const info = {

 discription:discription
}

dispatch(editDiscription(data.id,info))
setOpen(false)

// dispatch(uploadEducation(info))
}

useEffect(() => {
  setdiscription(data.discription)
}, [data])


  return (
    <>


      <EducationDialog
        open={open}
        TransitionComponent={Transitionedu}
        keepMounted
        onClose={()=>setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        
        className="overflow-x-hidden"
      
      >
        <DialogTitle className="w-full text-center text-black text-2xl font-semibold">{"Responsibility Details"}</DialogTitle>
        <DialogContent>
          
          <DialogContentText style={{ overflowX: 'hidden' }} id="alert-dialog-slide-description">
       <form onSubmit={educationSubmit}>
       <div className="grid grid-cols-2 items-center place-items-center gap-1">
       <div className="flex flex-col ml-auto items-start w-[42vw] gap-4">
         <h1 className="text-black">Description </h1>
         <h3>If you have been/are an active part of societies, conducted any events or led a team, add details here</h3>
         <textarea name="" value={discription} onChange={(e)=>setdiscription(e.target.value)} className="w-full border-2 p-4 rounded-lg h-56" style={{resize:"none"}} id="" cols="30"  rows="10"></textarea>
         <h3 className="ml-auto">{discription?.length}/250</h3>
      </div>
    
         </div>
         <div className="w-full  flex items-center justify-center pt-4">
         {/* <button className="p-4 px-8 bg-blue-600 font-bold text-white rounded-xl">Save</button> */}
         <Button variant="contained" type="submit" className="px-10" style={{ backgroundColor: 'rgb(25, 118, 210)', color: 'white' }}>
          Update
          
          
          </Button>
         </div>
       </form>
          </DialogContentText>
        </DialogContent>

      </EducationDialog>

{/* <EditJob open={openEdit} setOpen={setopenEdit} data={data}/> */}
 
    </>
  );
};

export default EditResponsibility;
