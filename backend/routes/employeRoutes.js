const express = require("express");
const {homepage, EmployeData, login, signin, signout, sendMail, changePassword, resetPassword, UpdateData, avatarupload, getAllStudent} = require("../controllers/Employe/EmployeController") 
const { isAuthenticated, isAuthenticatedEmploye } = require("../middlewares/auth");
const { addedu, getEducation, deleteEducation, editEducation, addsec, deleteSecondary, editSecondary, addscholl, deleteSchool, editScholl, addDiploma, deleteDiploma, editDiploma, addphd, editphd, deletephd, addJob, deleteJob, editJob, addIntern, deleteIntern, editIntern, addSkills, deleteSkills, editSkills } = require("../controllers/resumeController");

const router = express.Router();

router.get("/",homepage)
// user data
router.get("/student",isAuthenticatedEmploye,EmployeData)
// login
router.post("/login",login)
// POST signIn
router.post("/signin",signin)
// POST SIGNOUT
router.post("/signout",isAuthenticatedEmploye,signout)
// for forget send mail POST
router.post("/internstudent/sendmail",sendMail)
// password changed 
router.post("/forgetlink/:id",changePassword)
// reset password
router.post("/reset/password",isAuthenticatedEmploye,resetPassword)
// update info
router.post("/resume/update",isAuthenticatedEmploye,UpdateData);
// img upload
router.post("/upload/avatar",isAuthenticatedEmploye,avatarupload)
router.get("/getall/student",isAuthenticatedEmploye,getAllStudent)
module.exports = router