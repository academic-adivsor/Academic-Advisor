"use strict";

var express = require("express");

var morgan = require("morgan");

var adminRouter = require("../routes/staff/adminRouter");

var app = express();
app.use(morgan("dev"));
app.use(express.json()); //admin register

app.use("/api/v1/admins", adminRouter);
module.exports = app;
//# sourceMappingURL=app.dev.js.map
