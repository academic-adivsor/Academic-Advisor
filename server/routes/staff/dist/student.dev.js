"use strict";

var express = require("express");

var _require = require("../../controller/students/studentsCtrl"),
    adminRegisterStudent = _require.adminRegisterStudent,
    loginStudent = _require.loginStudent,
    getStudentProfile = _require.getStudentProfile,
    getAllStudentsByAdmin = _require.getAllStudentsByAdmin,
    getStudentByAdmin = _require.getStudentByAdmin,
    studentUpdateProfile = _require.studentUpdateProfile,
    adminUpdateStudent = _require.adminUpdateStudent;

var isAdmin = require("../../middlewares/isAdmin");

var isLogin = require("../../middlewares/isLogin");

var isStudent = require("../../middlewares/isStudent"); // Fix typo here


var isStudentLogin = require("../../middlewares/isStudentLogin");

var studentRouter = express.Router();
studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, getStudentProfile);
studentRouter.get("/admin", isLogin, isAdmin, getAllStudentsByAdmin);
studentRouter.get("/:studentID/admin", isLogin, isAdmin, getStudentByAdmin);
studentRouter.put("/update", isStudentLogin, isStudent, studentUpdateProfile);
studentRouter.put("/:studentID/update/admin", isLogin, isAdmin, adminUpdateStudent);
module.exports = studentRouter;
//# sourceMappingURL=student.dev.js.map
