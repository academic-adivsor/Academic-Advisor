"use strict";

var express = require("express");

var morgan = require("morgan");

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

var app = express();
app.use(express.json()); //routes
//admin register

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter); //Error middlewares

app.use(notFoundErr);
app.use(globalErrHandler);
module.exports = app;
//# sourceMappingURL=app.dev.js.map
