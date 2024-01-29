const express = require("express");
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getTeacherByAdmin,
  getTeacherProfile,
  teacherUpdateProfile,
  adminUpdateTeacher,
  deleteTeacher,
  teacherUpdatePassword,

} = require("../../controller/staff/teachersCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const Teacher = require("../../model/staff/Teacher");
const advancedResults = require("../../middlewares/advancedResults");
const teachersRouter = express.Router();

teachersRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teachersRouter.post("/login", loginTeacher);

teachersRouter.get(
  "/admin",
   isLogin,
   isAdmin,
   advancedResults(Teacher, {
    path: "examsCreated",
    populate: {
      path: "questions",
    },
   }),
   getAllTeachersAdmin
   );

teachersRouter.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);
teachersRouter.get("/:teacherID/admin", isLogin, isAdmin, getTeacherByAdmin);
teachersRouter.put(
  "/:teacherID/update", 
  isTeacherLogin,
  isTeacher,
  teacherUpdateProfile
);
teachersRouter.put(
  "/:teacherID/update/admin",
  isLogin,
  isAdmin,
  adminUpdateTeacher
);
teachersRouter.delete(
  "/:teacherID/delete/admin",
  isLogin,
  isAdmin,
  deleteTeacher
);


teachersRouter.put(
  "/update",
  isTeacherLogin,
  isTeacher,
  teacherUpdatePassword
);

module.exports = teachersRouter;
