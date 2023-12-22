"use strict";

var express = require("express");

var _require = require("../middlewares/globalErrHandler"),
    globalErrHandler = _require.globalErrHandler,
    notFoundErr = _require.notFoundErr;

var academicTermRouter = require("../routes/academics/academicTerm");

var academicYearRouter = require("../routes/academics/academicYear");

var classLevelRouter = require("../routes/academics/classLevel");

var programRouter = require("../routes/academics/program");

var subjectRouter = require("../routes/academics/subjects");

var yearGroupRouter = require("../routes/academics/yearGroups");

var adminRouter = require("../routes/staff/adminRouter");

var teachersRouter = require("../routes/staff/teachers");

var examRouter = require("../routes/academics/examRoutes");

var studentRouter = require("../routes/staff/student");

var questionsRouter = require("../routes/academics/questionRoutes");

var chatRouter = require("../routes/chat/chatRouter");

var examResultRouter = require("../routes/academics/examRsultsRoute");

var _require2 = require("../controller/academics/examResults"),
    checkExamResults = _require2.checkExamResults;

var cors = require("cors"); // Add this line to import the cors module


var corsOptions = {
  origin: ['http://localhost:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 204
};
var app = express(); //Middlewares

app.use(express.json()); // Correct usage for parsing JSON payloads

app.use(cors()); // Add this line to enable CORS for all routes

app.use(express["static"](__dirname + '/public')); // Assuming your HTML file is in the 'public' folder
// Routes
//Routes

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
app.use("/api/v1/chat", cors(corsOptions), chatRouter); //Error middlewares

app.use(notFoundErr);
app.use(globalErrHandler);
module.exports = app;
//# sourceMappingURL=app.dev.js.map
