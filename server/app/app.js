const express = require("express");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const academicTermRouter = require("../routes/academics/academicTerm");
const academicYearRouter = require("../routes/academics/academicYear");
const classLevelRouter = require("../routes/academics/classLevel");
const programRouter = require("../routes/academics/program");
const subjectRouter = require("../routes/academics/subjects");
const yearGroupRouter = require("../routes/academics/yearGroups");
const adminRouter = require("../routes/staff/adminRouter");

const teachersRouter = require("../routes/staff/teachers");
const examRouter=require("../routes/academics/examRoutes");
const studentRouter = require("../routes/staff/student");
const questionsRouter=require("../routes/academics/questionRoutes");
const chatRouter = require("../routes/chat/chatRouter");
const examResultRouter=require("../routes/academics/examRsultsRoute");
const {checkExamResults}=require("../controller/academics/examResults");


const app = express();

//Middlewares
app.use(express.json()); // Correct usage for parsing JSON payloads
app.use(express.static(__dirname + '/public')); // Assuming your HTML file is in the 'public' folder

// Routes

//Routes
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/teachers", teachersRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/exam-results", examResultRouter);
app.use("/api/v1/chat", chatRouter);



//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;