"use strict";

require("dotenv").config();

var express = require("express");

var mongoose = require('mongoose');

var http = require('http');

var bodyParser = require('body-parser');

var dialogflow = require('dialogflow');

var uuid = require('uuid');

require("./config/dbConnect")(); // This will call the function and attempt to connect to the database.


var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 8000; // Connect to MongoDB

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // Initialize session client

var sessionClient = new dialogflow.SessionsClient({
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
}); // Generate session path

var sessionPath = sessionClient.sessionPath('parker-pslk', uuid.v4()); // Middlewares

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // Load routes (if they are in separate files)

var adminRouter = require("./routes/staff/adminRouter");

var academicTermRouter = require("./routes/academics/academicTerm");

var academicYearRouter = require("./routes/academics/academicYear");

var classLevelRouter = require("./routes/academics/classLevel");

var programRouter = require("./routes/academics/program");

var subjectRouter = require("./routes/academics/subjects");

var yearGroupRouter = require("./routes/academics/yearGroups");

var chatRoute = require("./routes/chatRoute");

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/chat", chatRoute); // Error middlewares

app.use(function (req, res, next) {
  res.status(404).json({
    message: 'Not Found'
  });
});
app.use(function (err, req, res, next) {
  console.error('Error:', error);
  res.status(500).json({
    message: 'Internal Server Error'
  });
}); // Start server

server.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
//# sourceMappingURL=server.dev.js.map
