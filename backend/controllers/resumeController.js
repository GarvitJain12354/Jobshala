const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const student = require("../models/studentModel");
const {v4:uuidv4} = require("uuid");

// getResume
exports.getEducation = CatchAsyncErrors(async(req,res,next)=>{
    const {resume} = await student.findById(req.id).exec();
        res.status(200).json({
            success:true,
            resume
        })
})
// eductaion
exports.addedu = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    studentData.resume.education.push({...req.body,id:uuidv4()});
    await studentData.save();
    res.status(200).json({
        message:"Diploma Added Successfully",
       
    })
 })
//  DELETEEDUCATION
exports.deleteEducation = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    const filteredEdu = studentData.resume.education.filter((i)=>
    i.id !== req.params.id
    )
    studentData.resume.education = filteredEdu;
    await studentData.save();
    res.status(200).json({
        message:"Diploma Deleted Successfully",

    })
 })
 exports.editEducation = CatchAsyncErrors(async(req,res,next)=>{
    try {
        const studentData = await student.findById(req.id);
        const index = studentData.resume.education.findIndex((i)=>i.id === req.params.id)
        studentData.resume.education[index] = {...studentData.resume.education[index],...req.body}
        await studentData.save();
        res.status(200).json({
            success:true,
            message:"Diploma Updated Successfully",

        })
    } catch (error) {
        console.log(error);
    }
 })
//  add secondary
exports.addsec = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    studentData.resume.secondary.push({...req.body,id:uuidv4()});
    await studentData.save();
    res.status(200).json({
        message:"Secondary Education Added Successfully",

    })
 })
 exports.deleteSecondary = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    const filteredEdu = studentData.resume.secondary.filter((i)=>
    i.id !== req.params.id
    )
    studentData.resume.secondary = filteredEdu;
    await studentData.save();
    res.status(200).json({
        message:"Secondary Education Deleted Successfully",

    })
 })
 exports.editSecondary = CatchAsyncErrors(async(req,res,next)=>{
    try {
        const studentData = await student.findById(req.id);
        const index = studentData.resume.secondary.findIndex((i)=>i.id === req.params.id)
        studentData.resume.secondary[index] = {...studentData.resume.secondary[index],...req.body}
        await studentData.save();
        res.status(200).json({
            message:"Secondary Education Updated Successfully",

        })
    } catch (error) {
        console.log(error);
    }
 })

// Scholl
exports.addscholl = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    studentData.resume.school.push({...req.body,id:uuidv4()});
    await studentData.save();
    res.status(200).json({
        message:"Education Added Successfully",

    })
 })
 exports.deleteSchool = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    const filteredEdu = studentData.resume.school.filter((i)=>
    i.id !== req.params.id
    )
    studentData.resume.school = filteredEdu;
    await studentData.save();
    res.status(200).json({
        message:"Education Deleted Successfully",

    })
 })
 exports.editScholl = CatchAsyncErrors(async(req,res,next)=>{
    try {
        const studentData = await student.findById(req.id);
        const index = studentData.resume.school.findIndex((i)=>i.id === req.params.id)
        studentData.resume.school[index] = {...studentData.resume.school[index],...req.body}
        await studentData.save();
        res.status(200).json({
            message:"Education Updated Successfully",

        })
    } catch (error) {
        console.log(error);
    }
 })

 // DIPLOMA
exports.addDiploma = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    studentData.resume.diploma.push({...req.body,id:uuidv4()});
    await studentData.save();
    res.status(200).json({
        message:"Diploma Added Successfully",

    })
 })
 exports.deleteDiploma = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    const filteredEdu = studentData.resume.diploma.filter((i)=>
    i.id !== req.params.id
    )
    studentData.resume.diploma = filteredEdu;
    await studentData.save();
    res.status(200).json({
        message:"Diploma deleted Successfully",

    })
 })
 exports.editDiploma = CatchAsyncErrors(async(req,res,next)=>{
    try {
        const studentData = await student.findById(req.id);
        const index = studentData.resume.diploma.findIndex((i)=>i.id === req.params.id)
        studentData.resume.diploma[index] = {...studentData.resume.diploma[index],...req.body}
        await studentData.save();
        res.status(200).json({
            message:"Diploma Updated Successfully",

        })
    } catch (error) {
        console.log(error);
    }
 })
  // PHD
exports.addphd= CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    studentData.resume.phd.push({...req.body,id:uuidv4()});
    await studentData.save();
    res.status(200).json({
        message:"Phd Added Successfully",

    })
 })
 exports.deletephd = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    const filteredEdu = studentData.resume.phd.filter((i)=>
    i.id !== req.params.id
    )
    studentData.resume.phd = filteredEdu;
    await studentData.save();
    res.status(200).json({
        message:"Phd Deleted Successfully",

    })
 })
 exports.editphd = CatchAsyncErrors(async(req,res,next)=>{
    try {
        const studentData = await student.findById(req.id);
        const index = studentData.resume.phd.findIndex((i)=>i.id === req.params.id)
        studentData.resume.phd[index] = {...studentData.resume.phd[index],...req.body}
        await studentData.save();
        res.status(200).json({
            message:"Phd Updated Successfully",

        })
    } catch (error) {
        console.log(error);
    }
 })
   // JOB
exports.addJob= CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    studentData.resume.jobs.push({...req.body,id:uuidv4()});
    await studentData.save();
    res.status(200).json({
        message:"Job Added Successfully",

    })
 })
 exports.deleteJob = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    const filteredEdu = studentData.resume.jobs.filter((i)=>
    i.id !== req.params.id
    )
    studentData.resume.jobs = filteredEdu;
    await studentData.save();
    res.status(200).json({
        message:"Job Deleted Successfully",

    })
 })
 exports.editJob= CatchAsyncErrors(async(req,res,next)=>{
    try {
        const studentData = await student.findById(req.id);
        const index = studentData.resume.jobs.findIndex((i)=>i.id === req.params.id)
        studentData.resume.jobs[index] = {...studentData.resume.jobs[index],...req.body}
        await studentData.save();
        res.status(200).json({
            message:"Job Updated Successfully",

        })
    } catch (error) {
        console.log(error);
    }
 })
  // Internship Resume
exports.addIntern= CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    studentData.resume.internship.push({...req.body,id:uuidv4()});
    await studentData.save();
    res.status(200).json({
        message:"Internship Added Successfully",

    })
 })
 exports.deleteIntern = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    const filteredEdu = studentData.resume.internship.filter((i)=>
    i.id !== req.params.id
    )
    studentData.resume.internship = filteredEdu;
    await studentData.save();
    res.status(200).json({
        message:"Internship Deleted Successfully",

    })
 })
 exports.editIntern= CatchAsyncErrors(async(req,res,next)=>{
    try {
        const studentData = await student.findById(req.id);
        const index = studentData.resume.internship.findIndex((i)=>i.id === req.params.id)
        studentData.resume.internship[index] = {...studentData.resume.internship[index],...req.body}
        await studentData.save();
        res.status(200).json({
            message:"Internship Updated Successfully",

        })
    } catch (error) {
        console.log(error);
    }
 })
  // Responsibility Resume
exports.addIntern= CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    studentData.resume.responsibilty.push({...req.body,id:uuidv4()});
    await studentData.save();
    res.status(200).json({
        message:"Responsibility Added Successfully",

    })
 })
 exports.deleteIntern = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    const filteredEdu = studentData.resume.responsibilty.filter((i)=>
    i.id !== req.params.id
    )
    studentData.resume.responsibilty = filteredEdu;
    await studentData.save();
    res.status(200).json({
        message:"Responsibility Deleted Successfully",

    })
 })
 exports.editIntern= CatchAsyncErrors(async(req,res,next)=>{
    try {
        const studentData = await student.findById(req.id);
        const index = studentData.resume.responsibilty.findIndex((i)=>i.id === req.params.id)
        studentData.resume.responsibilty[index] = {...studentData.resume.responsibilty[index],...req.body}
        await studentData.save();
        res.status(200).json({
            message:"Responsibility Updated Successfully",

        })
    } catch (error) {
        console.log(error);
    }
 })
 // Responsibility Skills
exports.addSkills= CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    studentData.resume.skills.push({...req.body,id:uuidv4()});
    await studentData.save();
    res.status(200).json({
        message:"Skills Added Successfully",

    })
 })
 exports.deleteSkills = CatchAsyncErrors(async(req,res,next)=>{
    const studentData = await student.findById(req.id).exec();
    const filteredEdu = studentData.resume.skills.filter((i)=>
    i.id !== req.params.id
    )
    studentData.resume.skills = filteredEdu;
    await studentData.save();
    res.status(200).json({
        message:"Skills Deleted Successfully",

    })
 })
 exports.editSkills= CatchAsyncErrors(async(req,res,next)=>{
    try {
        const studentData = await student.findById(req.id);
        const index = studentData.resume.skills.findIndex((i)=>i.id === req.params.id)
        studentData.resume.skills[index] = {...studentData.resume.skills[index],...req.body}
        await studentData.save();
        res.status(200).json({
            message:"Skills Updated Successfully",

        })
    } catch (error) {
        console.log(error);
    }
 })