import { configDotenv } from "dotenv";
import {
  RemoveError,
  isError,
  studentLogin,
  studentLogout,
  loginSuccess,
  getstudentSuccess,
  getmessage,
  msgRequest,
  msgFail,
  studentData,
} from "../Reducers/controlreducers";
import axios from "@/utils/axios";
import { Try } from "@mui/icons-material";
// import {axios} from "@/utlis/axios";
// import axios from "../../utlis/axios.js";

export const getstudent = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/employe/student`);
    dispatch(studentLogin());
    dispatch(getstudentSuccess(data));
  } catch (error) {}
};
export const signinStudent = (info) => async (dispatch, getState) => {
  try {
    console.log("Start");
    const { data } = await axios.post(`/employe/signin`, info);

    dispatch(studentLogin());
  } catch (error) {
    dispatch(isError(error.response.data.message));
  }
};
export const signoutStudent = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/employe/signout`);

    dispatch(studentLogout());
  } catch (error) {
    // console.log(error.response.data.message);
  }
};
export const forgetPassword = (email) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/employe/internstudent/sendmail`, email);
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(isError(error.response.data.message));
  }
};

export const changePassword = (id, password) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/employe/forgetlink/${id}`, password);
    dispatch(loginSuccess());
    //  console.log(data);
  } catch (error) {
    // console.log(error);
    dispatch(isError(error.response.data.message));
  }
};
export const registerStudent = (info) => async (dispatch, getState) => {
  console.log(info);
  try {
    console.log(info);
    const { data } = await axios.post(`/employe/login`, info);
    console.log(data);
    dispatch(studentLogin(data));
  } catch (error) {
    console.log(error);
    dispatch(isError(error.response.data.message));
  }
};
export const resetpassword = (pass) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/employe/reset/password`, pass);
    dispatch(loginSuccess());
  } catch (error) {
    console.log(error);
    dispatch(isError(error.response.data.message));
  }
};
export const updateProfile = (info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/employe/resume/update`, info);
    dispatch(getmessage(data));
  } catch (error) {}
};
export const uploadAvatar = (myform) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/employe/upload/avatar`, myform);
    console.log(data);
  } catch (error) {}
};
// education
export const uploadEducation = (info) => async (dispatch, getState) => {
  try {
    dispatch(msgRequest());
    const { data } = await axios.post("/employe/add/education", info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
    dispatch(msgFail());
  }
};
export const deleteEducation = (id) => async (dispatch, getState) => {
  try {
    dispatch(msgRequest());
    const { data } = await axios.get(`/employe/delete/resume/${id}`);

    dispatch(getmessage(data));
  } catch (error) {
    dispatch(msgFail());
  }
};
export const editEducation = (id, info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/employe/edit/resume/${id}`, info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
// secondary
export const uploadSecondary = (info) => async (dispatch, getState) => {
  try {
    dispatch(msgRequest());
    const { data } = await axios.post("/employe/add/secondary", info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
    dispatch(msgFail());
  }
};
export const deleteSecondary = (id) => async (dispatch, getState) => {
  try {
    dispatch(msgRequest());
    const { data } = await axios.get(`/employe/delete/secondary/${id}`);
    dispatch(getmessage(data));
  } catch (error) {
    dispatch(msgFail());
  }
};
export const editSecondary = (id, info) => async (dispatch, getState) => {
  try {
    dispatch(msgRequest());
    const { data } = await axios.post(`/employe/edit/secondary/${id}`, info);
    dispatch(getmessage(data));
  } catch (error) {
    dispatch(msgFail());
  }
};
// SCHOOL
export const uploadSchool = (info) => async (dispatch, getState) => {
  try {
    dispatch(msgRequest());

    const { data } = await axios.post("/employe/add/school", info);
    dispatch(getmessage(data));
  } catch (error) {
    dispatch(msgFail());
  }
};
export const deleteSchool = (id) => async (dispatch, getState) => {
  try {
    dispatch(msgRequest());
    const { data } = await axios.get(`/employe/delete/school/${id}`);
    dispatch(getmessage(data));
  } catch (error) {
    dispatch(msgFail());
  }
};
export const editSchool = (id, info) => async (dispatch, getState) => {
  try {
    dispatch(msgRequest());
    const { data } = await axios.post(`/employe/edit/school/${id}`, info);
    dispatch(getmessage(data));
  } catch (error) {
    dispatch(msgFail());
  }
};

// DIPLOMA
export const uploadDiploma = (info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/add/diploma", info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const deleteDiploma = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/student/delete/diploma/${id}`);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const editDiploma = (id, info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/student/edit/diploma/${id}`, info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};

// PHD
export const uploadphd = (info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/add/phd", info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const deletephd = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/student/delete/phd/${id}`);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const editphd = (id, info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/student/edit/phd/${id}`, info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
// JOBS
export const uploadJob = (info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/add/job", info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const deleteJob = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/student/delete/job/${id}`);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const editJob = (id, info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/student/edit/job/${id}`, info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
// Internship
export const uploadIntern = (info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/add/intern", info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const deleteIntern = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/student/delete/intern/${id}`);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const editIntern = (id, info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/student/edit/intern/${id}`, info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
// Discription
export const uploadDiscription = (info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/add/discription", info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const deleteDiscription = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/student/delete/discription/${id}`);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const editDiscription = (id, info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/student/edit/discription/${id}`, info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
// skills
export const uploadskills = (info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/student/add/skills", info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const deleteskills = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/student/delete/skills/${id}`);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};
export const editskills = (id, info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/student/edit/skills/${id}`, info);
    dispatch(getmessage(data));
  } catch (error) {
    console.log(error);
  }
};

export const getAllStudent = ()=> async(dispatch,getState)=>{
  try {
    const {data} =await axios(`/employe/getall/student`)
    dispatch(studentData(data))
  } catch (error) {
    console.log(error);
  }
}