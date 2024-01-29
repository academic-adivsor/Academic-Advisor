const express = require("express");
const {
  adminRegisterStudent,
  loginStudent,
  getStudentProfile,
  getAllStudentsByAdmin,
  getStudentByAdmin,
  studentUpdateProfile,
  adminUpdateStudent,
  writeExam,
  deleteStudent,
} = require("../../controller/students/studentsCtrl");

const isAdmin = require("../../middlewares/isAdmin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const isLogin = require("../../middlewares/isLogin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const roleRestriction = require("../../middlewares/roleRestriction");
const Student = require("../../model/academic/Student");
const Admin = require("../../model/staff/Admin");
const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get(
  "/profile",
  isAuthenticated(Student),
  roleRestriction("student"),
  getStudentProfile
);
studentRouter.get(
  "/admin",
  isAuthenticated(Admin),
  getAllStudentsByAdmin
);
studentRouter.get(
  "/:studentID/admin",
  isAuthenticated(Admin),
  getStudentByAdmin
);

studentRouter.post(
  "/exam/:examID/write",
  isAuthenticated(Student),
  roleRestriction("student"),
  writeExam
);

studentRouter.put(
  "/update",
  isAuthenticated(Student),
  roleRestriction("student"),
  studentUpdateProfile
);
studentRouter.put(
  "/:studentID/update/admin",
  isAuthenticated(Admin),
  roleRestriction("admin"),
  adminUpdateStudent
);
studentRouter.delete(
  "/:studentID/delete/admin",
  isAuthenticated(Admin),
  roleRestriction("admin"),
  deleteStudent
);
module.exports = studentRouter;
