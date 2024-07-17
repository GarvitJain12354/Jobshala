"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Skeleton } from '@mui/material';
import { Fitbit } from '@mui/icons-material';
import Link from 'next/link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { signoutStudent } from '@/store/Action/action';
export default function TemporaryDrawer({user}) {
  const [state, setState] = React.useState({
 
    left: false
 
  });
  const [isListOpen, setIsListOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch()
  const handleLogout = ()=>{
    dispatch(signoutStudent())
    // router.push("/student/auth")
      }
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width:Fitbit || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
       
          <ListItem key={"text"} disableGutters>
            <ListItemButton>
              <ListItemIcon>
              <Avatar  alt={user?.firstname} src={user?.avatar.url}  />
              </ListItemIcon>
           <div className="flex flex-col">
           <ListItemText primary={`${user?.firstname} ${user?.lastname}`}/>
            <ListItemText primary={`${user?.email} `}/>
           </div>
            </ListItemButton>
          </ListItem>
     
      </List>
      <Divider />
      <List>
<Link href={"/student/homepage"}>
<ListItem key={"text"} disableGutters>
            <ListItemButton>
              <ListItemIcon className='h-12 w-12'>
                <img className='h-full w-full object-contain' src={`/home.svg`} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Home"}/>
            </ListItemButton>
          </ListItem>
</Link>
<Link href={"/student/application"}>
<ListItem key={"text"} disableGutters>
            <ListItemButton>
              <ListItemIcon className='h-12 w-12'>
                <img className='h-full w-full object-contain' src={`/myapplication.png`} alt="" />
              </ListItemIcon>
              <ListItemText primary={"My application"}/>
            </ListItemButton>
          </ListItem>
</Link>        
<Link href={"/student/resume"}>
<ListItem key={"text"} disableGutters>
            <ListItemButton>
              <ListItemIcon className='h-12 w-12'>
                <img className='h-full w-full object-contain' src={`/resume.png`} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Edit resume"}/>
            </ListItemButton>
          </ListItem>
</Link>   
<Link href={"/student/prefrence"}>
<ListItem key={"text"} disableGutters>
            <ListItemButton>
              <ListItemIcon className='h-12 w-12'>
                <img className='h-full w-full object-contain' src={`/prefrencepng.png`} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Edit prefrence"}/>
            </ListItemButton>
          </ListItem>
</Link>   
<Link href={"/student/guidance"}>
<ListItem key={"text"} disableGutters>
            <ListItemButton>
              <ListItemIcon className='h-12 w-12'>
                <img className='h-full w-full object-contain' src={`/guidance.png`} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Get Career Guidance"}/>
            </ListItemButton>
          </ListItem>
</Link> 
        <Accordion className='h-fit w-full ' expanded={expanded}  onChange={toggleExpansion} disableGutters>
      <AccordionSummary className='h-fit w-full ' expandIcon={<ExpandMoreIcon />} >
      <ListItem key={"text"} className='h-fit w-fit -ml-5' disablePadding>
            <ListItemButton>
              <ListItemIcon className='h-12 w-12'>
                <img className='h-full w-full object-contain' src={`/manage.png`} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Manage Account"}/>
            </ListItemButton>
          </ListItem>
      
      </AccordionSummary>
      <AccordionDetails >
      <Link href={"/student/changepassword"}>
<ListItem key={"text"} disableGutters disablePadding> 
            <ListItemButton>
              <ListItemIcon className='h-8 w-8'>
                <img className='h-full w-full object-contain' src={`/password.png`} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Change Password"}/>
            </ListItemButton>
          </ListItem>
</Link> 
<Link href={"/student/changeemail"}>
<ListItem key={"text"} disableGutters disablePadding> 
            <ListItemButton>
              <ListItemIcon className='h-8 w-8'>
                <img className='h-full w-full object-contain' src={`/email.png`} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Change Email"}/>
            </ListItemButton>
          </ListItem>
</Link> 
<Link href={"/student/delete"}>
<ListItem key={"text"} disableGutters disablePadding> 
            <ListItemButton>
              <ListItemIcon className='h-8 w-8'>
                <img className='h-full w-full object-contain' src={`/delete.png`} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Delete Account"}/>
            </ListItemButton>
          </ListItem>
</Link> 
      </AccordionDetails>
    </Accordion>
   
<ListItem key={"text"} onClick={handleLogout} disableGutters>
            <ListItemButton>
              <ListItemIcon className='h-12 w-12'>
                <img className='h-full w-full object-contain' src={`/logout.png`} alt="" />
              </ListItemIcon>
              <ListItemText primary={"Logout"}/>
            </ListItemButton>
          </ListItem>

      </List>
    </Box>
  );

  return (
    <div>
    
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer('left', true)}>  {user ? (
          <Avatar  alt={user?.firstname} src={user?.avatar.url}  />
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}</Button>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
    
    </div>
  );
}