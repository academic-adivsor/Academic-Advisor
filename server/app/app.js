const express = require("express");
const morgan = require("morgan");
const { globalErrHandler, notFoundErr, } = require("../middlewares/globalErrHandler");
const academicTermRouter = require("../routes/academics/academicTerm");
const academicYearRouter = require("../routes/academics/academicYear");
const classLevelRouter=require("../routes/academics/classLevel");
const programRouter=require("../routes/academics/program");
const subjectRouter=require("../routes/academics/subjects");
const adminRouter = require("../routes/staff/adminRouter");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
//routes
//admin register
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);
module.exports = app;