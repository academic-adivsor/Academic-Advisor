const express = require("express");
const {
  createSubject,
  deleteSubject,
  getProgram,
  getSubjects,
  updatSubject,
  getBysubjectId,
} = require("../../controller/academics/subjects");

const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const subjectRouter = express.Router();

subjectRouter.post("/:programID", isLogin, isAdmin, createSubject);

subjectRouter.get("/", isLogin, isAdmin, getSubjects);

subjectRouter.get("/:id", isLogin, isAdmin, getProgram);
subjectRouter.put("/:id", isLogin, isAdmin, updatSubject);
subjectRouter.delete("/:id", isLogin, isAdmin, deleteSubject);

subjectRouter.get("/getBysubjectId/:id", isLogin, getBysubjectId);

module.exports = subjectRouter;
