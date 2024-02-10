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
const cors = require("cors"); // Add this line to import the cors module


const corsOptions = {
  origin: ['http://localhost:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 204,
};
const app = express();

//Middlewares
app.use(express.json()); // Correct usage for parsing JSON payloads
app.use(cors()); // Add this line to enable CORS for all routes
app.use(express.static(__dirname + '/public')); // Assuming your HTML file is in the 'public' folder

// Routes

//Routes
//assigns links to each constant
app.use("/api/v1/admins", cors(corsOptions), adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/teachers", cors(corsOptions), teachersRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/students", cors(corsOptions), studentRouter);
app.use("/api/v1/exam-results", examResultRouter);
app.use("/api/v1/chat", cors(corsOptions), chatRouter);



//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;