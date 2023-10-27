const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const app = express();
const { globalErrHandler, notFoundErr, } = require("../middlewares/globalErrHandler");
const academicTermRouter = require("../routes/academics/academicTerm");
const academicYearRouter = require("../routes/academics/academicYear");
const classLevelRouter=require("../routes/academics/classLevel");
const programRouter=require("../routes/academics/program");
const subjectRouter=require("../routes/academics/subjects");
const yearGroupRouter=require("../routes/academics/yearGroups");
const adminRouter = require("../routes/staff/adminRouter");
app.use(express.json());
//routes
//admin register
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);
module.exports = app;

const whitelist = [
	'http://Admin-Dashboard-localhost',   
	'http://Student-Dashboard-main-localhost',
	'http://Doctor_DashBord-localhost', // Replace with your actual instructor localhost
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.listen(8801, () => {
  console.log('Server is running on http://localhost:8801');
});