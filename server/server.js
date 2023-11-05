require("dotenv").config(); 

const express = require("express");
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
require("./config/dbConnect")(); // This will call the function and attempt to connect to the database.

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize session client
const sessionClient = new dialogflow.SessionsClient({
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
});

// Generate session path
const sessionPath = sessionClient.sessionPath('parker-pslk', uuid.v4());

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Load routes (if they are in separate files)
const adminRouter = require("./routes/staff/adminRouter");
const academicTermRouter = require("./routes/academics/academicTerm");
const academicYearRouter = require("./routes/academics/academicYear");
const classLevelRouter = require("./routes/academics/classLevel");
const programRouter = require("./routes/academics/program");
const subjectRouter = require("./routes/academics/subjects");
const yearGroupRouter = require("./routes/academics/yearGroups");
const chatRouter = require("./routes/chatRouter");

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/chat", chatRouter);

// Error middlewares
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});