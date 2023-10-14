const express = require("express");
const morgan = require("morgan");
const { globalErrHandler, notFoundErr, } = require("../middlewares/globalErrHandler");
const academicYearRouter = require("../routes/academics/academicYear");
const adminRouter = require("../routes/staff/adminRouter");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
//routes
//admin register
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);
module.exports = app;