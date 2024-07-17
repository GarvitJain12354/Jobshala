const errorHanler = require("../../error/errorHandler");
const { sendEmployeToken } = require("../../jwt/sendToken");
const { CatchAsyncErrors } = require("../../middlewares/CatchAsyncerror");
const Employe = require("../../models/EmployeModel");



const imagekit = require("../../middlewares/imagekit.js").initimagekit();
const path = require("path");
const { sendmail } = require("../../nodemailer/nodemailer");
const student = require("../../models/studentModel");

exports.homepage = CatchAsyncErrors(async (req, res, next) => {
//   const EmployeData = await Employe.find().exec();

  res.json({ message: "This is Employe Data" });
});
exports.login = CatchAsyncErrors(async (req, res, next) => {
  const employe = await new Employe(req.body).save();
  //    res.status(201).json(studentModel)
sendEmployeToken(employe, 200, res);
});
exports.EmployeData = CatchAsyncErrors(async (req, res, next) => {
  const studentModel = await Employe.findById(req.id).exec();
  res.json(studentModel);
});
exports.signin = CatchAsyncErrors(async (req, res, next) => {
  const studentModel = await Employe
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!studentModel) return next(new errorHanler("User not found", 500));
  const isMatch = studentModel.comparepassword(req.body.password);

  if (!isMatch) return next(new errorHanler("Wrong password", 500));

sendEmployeToken(studentModel, 201, res);
});
exports.signout = CatchAsyncErrors(async (req, res, next) => {
  res.clearCookie("studentToken");
  res.json({ message: "Sign Out" });
});
exports.sendMail = CatchAsyncErrors(async (req, res, next) => {
  const EmployeData = await Employe.findOne({ email: req.body.email }).exec();
  console.log(EmployeData);
  if (!EmployeData) {
    return next(new errorHanler("User with this email does not exist ", 404));
  }
  const url = `http://localhost:3000/Employe/forgetlink/${EmployeData._id}`;
  EmployeData.resetpasswordToken = "1";
  EmployeData.save();
  console.log(EmployeData.resetpasswordToken);

  sendmail(req, res, next, url);
  res.json({ EmployeData, url });
});
exports.changePassword = CatchAsyncErrors(async (req, res, next) => {
  const EmployeData = await Employe.findById({ _id: req.params.id }).exec();

  if (!EmployeData) {
    next(new errorHanler("User not exist"), 500);
  }

  if (EmployeData.resetpasswordToken === "1") {
    EmployeData.password = req.body.password;
    EmployeData.resetpasswordToken = "0";
    EmployeData.save();

    res.status(200).json({
      message: "Password Change Succesfully",
    });
  } else {
    res.status(400).json({
      message: "Link Expired",
    });
  }
});
exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const EmployeData = await Employe
    .findById({ _id: req.id })
    .select("+password");
  const isMatch = EmployeData.comparepassword(req.body.oldpassword);
  console.log(EmployeData);
  if (!isMatch) return next(new errorHanler("Wrong password", 500));
  if (isMatch) {
    EmployeData.password = req.body.newpassword;
    await EmployeData.save();
  sendEmployeToken(EmployeData, 201, res);
  }
  res.status(200).json({ message: "Password is changed succesfully" });
});
exports.UpdateData = CatchAsyncErrors(async (req, res, next) => {
  console.log("hello");
  const EmployeData = await Employe.findByIdAndUpdate(req.id, req.body).exec();

  res.status(200).json({ message: "Student updated successfully" });
});
exports.avatarupload = CatchAsyncErrors(async (req, res, next) => {
  const EmployeData = await Employe.findById(req.id).exec();

  const file = req.files.avatar;
  const modifiedFileName = `Employegarvitjain-${Date.now()}${path.extname(file.name)}`;
  if (EmployeData.avatar.fileId !== "") {
    await imagekit.deleteFile(EmployeData.avatar.fileId);
  }
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  EmployeData.avatar = { fileId, url };
  await EmployeData.save();
  res.json({ message: "Profile Image uploaded" });
});
exports.getAllStudent = CatchAsyncErrors(async(req,res,next)=>{
  const studentData = await student.find().exec()
   res.status(200).json({
    message:"Get all students Data",
    student :studentData
   })
})