const express = require("express");
const {
  createProgram,
  deleteProgram,
  getProgram,
  getPrograms,
  updatProgram,
  getProgramByname,
} = require("../../controller/academics/programs");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const programRouter = express.Router();

// academicTerRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicTerRouter.get("/", isLogin, isAdmin, getAcademicYears);

programRouter
  .route("/")
  .post(isLogin, isAdmin, createProgram)
  .get(isLogin, isAdmin, getPrograms);

programRouter
  .route("/:id")
  .get(isLogin, getProgram)
  .put(isLogin, isAdmin, updatProgram)
  .delete(isLogin, isAdmin, deleteProgram);
  programRouter.get("/name/:id", isLogin, getProgramByname);

// academicTerRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicTerRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicTerRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = programRouter;
