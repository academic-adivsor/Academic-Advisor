const express = require("express");
const {  adminRegisterStudent,
         loginStudent,
         getStudentProfile,
         getAllStudentsByAdmin,
         getStudentByAdmin,
         studentUpdateProfile,
         adminUpdateStudent, } = require("../../controller/students/studentsCtrl");

const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, getStudentProfile);
studentRouter.get("/admin", isLogin, isAdmin, getAllStudentsByAdmin);
studentRouter.get("/studentID", isLogin, isAdmin, getStudentByAdmin);
studentRouter.put("/update", isStudentLogin, isStudent, studentUpdateProfile);
studentRouter.put(
    "/:studentID/update/admin",
     isLogin, 
     isAdmin, 
     adminUpdateStudent,
);
module.exports = studentRouter;
const express = require("express");
const {
  adminRegisterStudent,
  loginStudent,
} = require("../../controller/students/studentsCtrl");

const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
module.exports = studentRouter;
