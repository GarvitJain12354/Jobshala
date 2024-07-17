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
import { deleteEducation, editEducation, getResume, uploadEducation } from "@/store/Action/action";
import Secondary from "./Secondary";
import  School  from "./School";
import Diploma from "./Diploma";
import Phd from "./Phd";
import { clearmessage } from "@/store/Reducers/controlreducers";
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
const Addedu = () => {
  const { message, error, isAuthenticated, user,msg } = useSelector(
    (state) => state.counterReducer
  );
  const dispatch = useDispatch();
 
  const [open, setOpen] = useState(false);
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
const [opensecondary, setopensecondary] = useState(false)
const [openSchool, setopenSchool] = useState(false)
const [diploma, setdiploma] = useState(false)
const [openphd, setopenphd] = useState(false)
const [reload, setreload] = useState(false)
const handleChange = (event) => {
  setAge(event.target.value);
};

const startyear = []
for (let index = 1980; index < 2025; index++) {
  startyear.push(index)
  
}
const endyear = []
for (let index = 1980; index < 2030; index++) {
  endyear.push(index)
  
}
useEffect(() => {
  user?.resume.education?.map((dets)=>(
    console.log(dets),
    setCollege(dets?.college || ""),
    setstart(dets?.start || ""),
    setend(dets?.ending || ""),
    setdegree(dets?.degree || ""),
    setstream(dets?.stream || ""),
    setperformance(dets?.performance || ""),
    setpercentage(dets?.percentage || "")

  ))
}, [user])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 const handelperformance = (e)=>{
setperformance(e.target.value)
 }
const educationSubmit = (e)=>{
  e.preventDefault();
  
  if(College === ""){
        return toast.error("College name is required");
  }
 
  if(start === ""){
        return toast.error("Starting date name is required");
  }
  if(end === ""){
        return toast.error("ending date name is required");
  }
  if(degree === ""){
    return toast.error("Degree  is required");
}
const info = {
  college:College,
  start:start,
  ending:end,
  degree:degree,
  branch:stream,
  percentage:percentage,
  performance:performance
}

{user?.resume?.education?.length !== 0 ? dispatch(editEducation(diplomaid,info)) : dispatch(uploadEducation(info))}
setopendiploma(false)

// dispatch(uploadEducation(info))
}

const deleteeducation = (id)=>{
  console.log(id);
dispatch(deleteEducation(id))
}
const editeducation = (id)=>{
  setdiplomaid(id)
  setopendiploma(true)
}
// useEffect(() => {
//   if (msg) {
//     toast.success(msg);
//     dispatch(clearmessage());
//   }
// }, [msg,dispatch]);
  return (
    <>
      <div className="flex  gap-2 py-6">
        <div className="flex gap-6 items-start ">
          <h1 className="text-md font-normal  mt-6">EDUCATION</h1>
        </div>
        <div className="flex flex-col gap-1 p-6 px-16 w-[80%] ">
        {user?.resume?.education.map((dets)=>(

<div className="flex flex-col">
          
<div className="flex w-full items-center justify-between">
  {dets?.degree ? 
    <h1 className="text-xl font-semibold text-black">
    {/* Senior Secondary (XII), Science */}
    {dets?.degree} {dets?.stream}
  </h1> : ""
  }

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
<Secondary setsecondary={setopensecondary} open={opensecondary}/>
<School setsecondary={setopenSchool} open={openSchool}/>
<Diploma setsecondary={setdiploma} open={diploma}/>
<Phd setsecondary={setopenphd} open={openphd}/>
          <div
            onClick={handleClickOpen}
            className="flex text-blue-600 font-normal cursor-pointer font-[poppins]  gap-2 mt-3 "
          >
            <i className="ri-add-fill"></i> Add Education
          </div>
        </div>
      </div>

      <Divider />

      <TopDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl"
      >
        <DialogTitle>{"Educations"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {user?.resume?.education.length !== 0 ? "" :
             <div
             onClick={()=> {setopendiploma(true); setOpen(false)}}
             className="flex cursor-pointer text-blue-600 font-normal font-[poppins]  gap-2 mt-3 "
           >
             <i className="ri-add-fill"></i> Add graduation/ post graduation
           </div>
            }
           {user?.resume?.secondary?.length !== 0 ? "" :
           <div
           onClick={()=> {setopensecondary(true); setOpen(false)}}
       className="flex cursor-pointer text-blue-600 font-normal font-[poppins]  gap-2 mt-3 "
     >
       <i className="ri-add-fill"></i> Add senior secondary (XII)
     </div>
            }
           {user?.resume?.school?.length !== 0 ? "" :
         <div
         onClick={()=> {setopenSchool(true); setOpen(false)}}

className="flex cursor-pointer text-blue-600 font-normal font-[poppins]  gap-2 mt-3 "
>
<i className="ri-add-fill"></i> Add secondary (X)
</div>
            }
              {user?.resume?.diploma?.length !== 0 ? "" :
         <div
         onClick={()=> {setdiploma(true); setOpen(false)}}

         className="flex cursor-pointer text-blue-600 font-normal font-[poppins]  gap-2 mt-3 "
       >
         <i className="ri-add-fill"></i> Add diploma
       </div>
            }
        {user?.resume?.phd?.length !== 0 ? "" :
         <div
         onClick={()=> {setopenphd(true); setOpen(false)}}
         className="flex text-blue-600 font-normal cursor-pointer font-[poppins]   gap-2 mt-3 "
       >
         <i className="ri-add-fill"></i> Add PhD
       </div>
            }
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </TopDialog>
      <EducationDialog
        open={opendiploma}
        TransitionComponent={Transitionedu}
        keepMounted
        onClose={()=>setopendiploma(false)}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl"
      
      >
        <DialogTitle className="w-full text-center text-black text-2xl font-semibold">{"Graduation details/ Post graduation details"}</DialogTitle>
        <DialogContent>
          
          <DialogContentText id="alert-dialog-slide-description">
       <form onSubmit={educationSubmit}>
       <div className="grid grid-cols-2 items-center place-items-center gap-1">
         <div className="flex items-start flex-col justify-center w-[30vw] gap-3 p-2 ml-auto ">
        <h1 className="font-bold text-lg">College</h1>
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
        <h1 className="font-bold text-lg">Degree</h1>
        <TextField
              id="outlined-basic"
              onChange={(e)=>setdegree(e.target.value)}
              value={degree}
 
              // label="First Name"
              placeholder="eg. Bsc B.tech"
              type="text"
              variant="outlined"
              className='rounded-3xl w-full  hover:border-indigo-300'
              // required
            />
      </div>
      <div className="flex items-start flex-col justify-center w-full gap-3 p-2 ">
        <h1 className="font-bold text-lg">Stream <span className="text-xs">(optiopnal)</span></h1>
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
      <div className="w-[55vw] rounded-lg p-4 bg-gray-200 mt-4 ml-auto">
        <h3>Example: If your degree is B.Sc in Chemistry, then select Bachelor of Science (B.Sc) in degree and Chemistry in streams.</h3>
        <h3 className="mt-3">If you can't find your degree, check for typos or different ways of writing your degree or choose from the closest available. Write to support <span className="text-blue-500">@internwallah.com</span> if you are pursuing a degree not available in the list.</h3>
      </div>
      <span></span>
      <div className="flex items-start flex-col justify-center w-full gap-3 p-2 ">
        <h1 className="font-bold text-lg">Performance Scale <span className="text-xs">(optiopnal)</span></h1>
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
        <h1 className="font-bold text-lg"> Performance <span className="text-xs">(optiopnal)</span></h1>
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
          {user?.resume?.education?.length !== 0 ? "Update" : "Save" }
          
          
          </Button>
         </div>
       </form>
          </DialogContentText>
        </DialogContent>

      </EducationDialog>


 
    </>
  );
};

export default Addedu;
