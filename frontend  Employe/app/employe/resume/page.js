"use client";
import Nav from '@/Components/Nav/Nav'
import { Alert, AlertTitle, Chip, Divider, ListItem, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Multiselect from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';
import { getstudent, updateProfile, uploadAvatar } from '@/store/Action/action';
import Addedu from '@/Components/ResumePage/Addedu';
import Job from '@/Components/ResumePage/Job/Job';
import Intern from '@/Components/ResumePage/Internship/Intern';
import Responsibility from '@/Components/ResumePage/Responsibilty/Responsibility';
import Skills from '@/Components/ResumePage/Skills/Skills';
import { clearmessage } from '@/store/Reducers/controlreducers';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    height: 'calc(100% - 64px)', // Adjust this value as needed
    overflowY: 'scroll',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const page = () => {
  const { message,error,isAuthenticated,user,msg ,loading} = useSelector((state) => state.counterReducer);
const dispatch = useDispatch();
const [firstname, setfirstname] = useState("")
const [lastname, setlastname] = useState("");
const [email, setemail] = useState("")
const [contact, setcontact] = useState("")
const [image, setimage] = useState("")
const [open, setOpen] = useState(false);
const [pincode, setpincode] = useState("")
const [state, setstate] = useState("")
const [city, setcity] = useState("")
const [gender, setgender] = useState("");
const [selectedLanguages, setSelectedLanguages] = useState([]);
console.log(msg,789);
// useEffect(() => {
//   // Prepopulate the selectedLanguages state with data from the backend
//   // setSelectedLanguages(user?.language?.map((language )=> ({ name: language })));
  
 
// }, [user , dispatch]);
console.log(user);
const options = [
  { name: 'Hindi' },
  { name: 'English' },
  { name: 'Telugu' },
  { name: 'Tamil' },
  { name: 'Marathi' },
  { name: 'French' },
  // Add more language options as needed
];

const handleSelect = (selectedList, selectedItem) => {
  setSelectedLanguages(selectedList);
};

const handleRemove = (selectedList, removedItem) => {
  setSelectedLanguages(selectedList);
};

const handleClickOpen = () => {
  setOpen(true);
};
const file = useRef(null)
const handleClose = () => {
  setOpen(false);
};
const openfile = ()=>{
 file.current.click()
}
const contactragax = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
const handelpinCode = async(e)=>{
  setpincode(e.target.value)
  try {
    const {data} = await axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`)
 
var state = data[0].PostOffice[0].Circle
setstate(`${state}`)
var city = data[0].PostOffice[0].District
setcity(`${city}`)}
catch(error){
setstate("")
setcity("")
}
}
const resumeSubmit = (e)=>{
  e.preventDefault()
const data = {
  firstname:firstname,
  lastname:lastname,
  email:email,
  contact:contact,
  pincode:pincode,
  city:city,
  state:state,
  language:selectedLanguages
}
console.log(data);
dispatch(updateProfile(data))

if(image !== ""){
  const myform = new FormData(e.target)

  myform.set("avatar",e.target.img.files[0])
  dispatch(uploadAvatar(myform))
}

}

useEffect(() => {
  if(msg){
    toast.success(msg)
    dispatch(clearmessage())
    dispatch(getstudent())
  }
  const languageNames = user?.language?.map((language) => ({name : language.name})) || [];

setSelectedLanguages(languageNames)
  setfirstname(user?.firstname)
  setlastname(user?.lastname)
  setemail(user?.email)
  setgender(user?.gender)
  setpincode(user?.pincode)
  setcity(user?.city)
  setstate(user?.state)
  setcontact(user?.contact)
}, [msg,user,loading,isAuthenticated,dispatch])

// console.log(user);
  return (
    <>
    <div className="flex flex-col items-center font-[gilroy] py-2 justify-center w-full min-h-screen overflow-auto relative gap-6">
  <Nav/>
        <h1 className='text-5xl mt-44'>Resume</h1>
        <Alert severity="info">Whenever you apply to an internship or fresher job, this is the resume that the employer will see. Always make sure it is up to date.</Alert>
        <div className="min-h-screen w-[60%] border text-gray-600 shadow flex flex-col px-24 py-8">
            <div className="flex flex-col gap-2 py-2 pb-6 ">
                <div className="flex gap-6 items-center">
                <h1 className='text-3xl font-medium '>{user?.firstname} {user?.lastname}</h1>
                <i  onClick={handleClickOpen} className="ri-pencil-line text-3xl font-extralight cursor-pointer"></i>
                </div>
                <h3 className='font-normal'>{user?.email}</h3>
                <h3 className='font-normal'>{user?.contact}</h3>
                <h3 className='font-normal'>{user?.city}</h3>
            </div>
            <Divider/>
            <Addedu/>
            <Job/>
            <Intern/>
            <Responsibility/>
            <Skills/>
        </div>
      

    </div>
   
    <BootstrapDialog
  onClose={handleClose}
  aria-labelledby="customized-dialog-title"
  open={open}
  maxWidth="md" 
  fullWidth
>
  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
    Modal title
  </DialogTitle>
  <IconButton
    aria-label="close"
    onClick={handleClose}
    sx={{
      position: 'absolute',
      right: 8,
      top: 8,
      color: (theme) => theme.palette.grey[500],
    }}
  >
    <CloseIcon />
  </IconButton>
  <DialogContent dividers>
 <form onSubmit={resumeSubmit} encType='multipart-formdata'>
 <div className="w-full grid grid-cols-2 gap-4 items-center place-content-center overflow-hidden">
      <div className="flex items-start flex-col gap-4 p-2 ">
        <h1>First name</h1>
        <TextField
              id="outlined-basic"
              value={firstname}
              onChange={(e)=>setfirstname(e.target.value)}
              // label="First Name"
              type="text"
              variant="outlined"
              className='rounded-3xl w-[80%] hover:border-indigo-300'
              // required
            />
      </div>
      <div className="flex items-start flex-col gap-4 p-2 ">
        <h1>Last name</h1>
        <TextField
              id="outlined-basic"
              value={lastname}
              onChange={(e)=>setlastname(e.target.value)}
              // label="First Name"
              type="text"
              variant="outlined"
              className='rounded-lg w-[80%] hover:border-indigo-300'
              // required
            />
      </div>
      <div className="flex shrink-0 items-start flex-col gap-4 p-2 w-screen" onClick={openfile}>
        <h1>Profile Picture <span className='text-xs'>( Recomended )</span></h1>
       <div className="div flex items-center justify-center p-6 px-24 gap-2 text-lg font-semibold text-blue-400 cursor-pointer border-dashed border-2 border-blue-300 bg-blue-100">
       <i className="ri-upload-cloud-2-line"></i>
        Upload Picture 
        <input type="file" name='img' accept=".png, .jpg, .jpeg .avif" ref={file} onChange={(e)=>setimage(e.target.value)} className='hidden'/>

       </div>
      </div>
      <span className='w-0 bg-black'></span>
      <span className='w-screen'>
      <Alert severity="info">

  Upload a professional picture of yourself Max file size: 1Mb and max resolution: 500px x 500px. File type - <strong>jpeg, jpg, png</strong>
</Alert>
      </span>
      <span className='w-0 bg-black'></span>
      <div className="div w-[50vw] flex items-start flex-col gap-4 p-2 ">
        {/* <h1>Email</h1> */}
       <TextField
              id="outlined-basic"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              label="Email"
              type="email"
              variant="outlined"
              className='rounded-lg w-[80%] hover:border-indigo-300'
              // required
            />
      </div>
      <span className='relative p-2 h-full'>
        <Link className='absolute bottom-2 font-semibold text-sm text-blue-800 cursor-pointer right-5 ' href={"/employe/changeemail"}>Change Email</Link>
      </span>
      <div className="div w-[50vw] flex items-start flex-col gap-4 p-2 ">
        {/* <h1>Conatct Number</h1> */}
       <TextField
              id="outlined-basic"
              value={contact}
              onChange={(e)=>setcontact(e.target.value)}
              label="Conatct Number"
              type="number"
              variant="outlined"
              className='rounded-lg w-[80%] hover:border-indigo-300'
              // required
            />
      </div>
     <span></span>
      <div className="flex items-start flex-col gap-4 p-2 ">
        {/* <h1>Pin Code</h1> */}
        <TextField
              id="outlined-basic"
              value={pincode}
              onChange={handelpinCode}

              label="Pin Code"
              type="number"
              variant="outlined"
              className='rounded-3xl w-[80%] hover:border-indigo-300'
              inputProps={{
                minLength: 6,
                maxLength: 6,
                onKeyDown: (evt) =>
                  ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }}
              // required
            />
      </div>
      <span></span>
      <div className="flex items-start flex-col gap-4 p-2 ">
        {/* <h1>City</h1> */}
        <TextField
              id="outlined-basic"
              value={city}
              type="text"
              label="City"
              variant="outlined"
              className='rounded-3xl w-[80%] hover:border-indigo-300'
            />
         
      </div>
      <div className="flex items-start flex-col gap-4 p-2 ">
        {/* <h1>State</h1> */}
        <TextField
              id="outlined-basic"
              value={state}
              // onChange={(e)=>setpincode(e.target.value)}
              label="State"
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
      </div>
      <div className='h-fit p-2'>
          <Multiselect
              keepSearchTerm={true}
        options={options}
        selectedValues={selectedLanguages}
        onSelect={handleSelect}
        onRemove={handleRemove}
        displayValue="name" // Property name to display in the dropdown options
        showCheckbox={true} // Show checkboxes to select/deselect items
        placeholder="Select Languages"
        className='p-6 rounded-lg'
     // Keep search input and options at the top
      />
      {/* You can display the selectedLanguages array or use it as needed */}
     
    </div>
    <span></span>
      <div className="flex flex-col gap-2 ml-4">
      <h1>Gender</h1>
      <div className="flex gap-4 items-center justify-center w-fit py-4 ml-3">
      
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
      </div>
 
          <span></span>
 
    {/* <div className="h-96"></div> */}
    </div>
    <div className="div flex items-center justify-center w-full">
      <button className='p-4 bg-blue-200 px-14 border rounded-full border-blue-400 border-dashed text-blue-500 font-semibold'>
        Update
      </button>
    </div>
 </form>
  </DialogContent>
</BootstrapDialog>
    </>
  )
}

export default page