"use strict";

var express = require("express");

var _require = require("../../controller/staff/teachersCtrl"),
    adminRegisterTeacher = _require.adminRegisterTeacher,
    loginTeacher = _require.loginTeacher,
    getAllTeachersAdmin = _require.getAllTeachersAdmin,
    getTeacherByAdmin = _require.getTeacherByAdmin,
    getTeacherProfile = _require.getTeacherProfile,
    teacherUpdateProfile = _require.teacherUpdateProfile,
    adminUpdateTeacher = _require.adminUpdateTeacher;

var isAdmin = require("../../middlewares/isAdmin");

var isLogin = require("../../middlewares/isLogin");

var isTeacher = require("../../middlewares/isTeacher");

var isTeacherLogin = require("../../middlewares/isTeacherLogin");

var Teacher = require("../../model/staff/Teacher");

var advancedResults = require("../../middlewares/advancedResults");

var teachersRouter = express.Router();
teachersRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teachersRouter.post("/login", loginTeacher);
teachersRouter.get("/admin", isLogin, isAdmin, advancedResults(Teacher, {
  path: "examsCreated",
  populate: {
    path: "questions"
  }
}), getAllTeachersAdmin);
teachersRouter.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);
teachersRouter.get("/:teacherID/admin", isLogin, isAdmin, getTeacherByAdmin);
teachersRouter.put("/:teacherID/update", isTeacherLogin, isTeacher, teacherUpdateProfile);
teachersRouter.put("/:teacherID/update/admin", isLogin, isAdmin, adminUpdateTeacher);
module.exports = teachersRouter;
//# sourceMappingURL=teachers.dev.js.map
