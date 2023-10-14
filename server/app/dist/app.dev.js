"use strict";

var express = require("express");

var morgan = require("morgan");

var _require = require("../middlewares/globalErrHandler"),
    globalErrHandler = _require.globalErrHandler,
    notFoundErr = _require.notFoundErr;

var academicYearRouter = require("../routes/academics/academicYear");

var adminRouter = require("../routes/staff/adminRouter");

var app = express();
app.use(morgan("dev"));
app.use(express.json()); //routes
//admin register

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter); //Error middlewares

app.use(notFoundErr);
app.use(globalErrHandler);
module.exports = app;
//# sourceMappingURL=app.dev.js.map
