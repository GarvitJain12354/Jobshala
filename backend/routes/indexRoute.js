const express = require("express");
const { homepage, login, signin, signout, studentData, sendMail, changePassword, resetPassword, UpdateData, avatarupload } = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const { addedu, getEducation, deleteEducation, editEducation, addsec, deleteSecondary, editSecondary, addscholl, deleteSchool, editScholl, addDiploma, deleteDiploma, editDiploma, addphd, editphd, deletephd, addJob, deleteJob, editJob, addIntern, deleteIntern, editIntern, addSkills, deleteSkills, editSkills } = require("../controllers/resumeController");

const router = express.Router();

router.get("/",homepage)
// user data
router.get("/student",isAuthenticated,studentData)
// login
router.post("/login",login)
// POST signIn
router.post("/signin",signin)
// POST SIGNOUT
router.post("/signout",isAuthenticated,signout)
// for forget send mail POST
router.post("/internstudent/sendmail",sendMail)
// password changed 
router.post("/forgetlink/:id",changePassword)
// reset password
router.post("/reset/password",isAuthenticated,resetPassword)
// update info
router.post("/resume/update",isAuthenticated,UpdateData);
// img upload
router.post("/upload/avatar",isAuthenticated,avatarupload)
// get resume
router.get("/get/resume",isAuthenticated,getEducation)
// Eduction add 
router.post("/add/education",isAuthenticated,addedu)
// Delete education
router.get("/delete/resume/:id",isAuthenticated,deleteEducation)
// edit education
router.post("/edit/resume/:id",isAuthenticated,editEducation)
// add secondary
router.post("/add/secondary",isAuthenticated,addsec)
// delete secondary 
router.get("/delete/secondary/:id",isAuthenticated,deleteSecondary)
// edit secondary
router.post("/edit/secondary/:id",isAuthenticated,editSecondary)
// add scholl
router.post("/add/school",isAuthenticated,addscholl)
// delete secondary 
router.get("/delete/school/:id",isAuthenticated,deleteSchool)
// edit scholl
router.post("/edit/school/:id",isAuthenticated,editScholl)
// add Diploma
router.post("/add/diploma",isAuthenticated,addDiploma)
// delete secondary 
router.get("/delete/diploma/:id",isAuthenticated,deleteDiploma)
// edit Diploma
router.post("/edit/diploma/:id",isAuthenticated,editDiploma)
// add phD
router.post("/add/phd",isAuthenticated,addphd)
// delete secondary 
router.get("/delete/phd/:id",isAuthenticated,deletephd)
// edit phD
router.post("/edit/phd/:id",isAuthenticated,editphd)
// add Job
router.post("/add/job",isAuthenticated,addJob)
// delete secondary 
router.get("/delete/job/:id",isAuthenticated,deleteJob)
// edit Job
router.post("/edit/job/:id",isAuthenticated,editJob)
// add internship
router.post("/add/intern",isAuthenticated,addIntern)
// delete internship
router.get("/delete/intern/:id",isAuthenticated,deleteIntern)
// edit internship
router.post("/edit/intern/:id",isAuthenticated,editIntern)
// add discription
router.post("/add/discription",isAuthenticated,addIntern)
// delete discription
router.get("/delete/discription/:id",isAuthenticated,deleteIntern)
// edit discription
router.post("/edit/discription/:id",isAuthenticated,editIntern)
// add skills
router.post("/add/skills",isAuthenticated,addSkills)
// delete skills
router.get("/delete/skills/:id",isAuthenticated,deleteSkills)
// edit skills
router.post("/edit/skills/:id",isAuthenticated,editSkills)
module.exports = router