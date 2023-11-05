require("../config/dbConnect");
const private_key = process.env.DIALOGFLOW_PRIVATE_KEY;
const client_email = process.env.DIALOGFLOW_CLIENT_EMAIL;
const express = require("express");
const bodyParser = require('body-parser');
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
const chatRouter = require("../routes/chatRouter");
app.use(require('../routes/chatRouter'));
app.use(express.json());
app.use(bodyParser.json());
//routes
//admin register
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/chat", chatRouter);
//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);
const whitelist = [
  'http://192.168.1.7:8080',
  'http://127.0.0.1:8080',

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

const dialogflow = require('dialogflow');
const uuid = require('uuid');

// Initialize session client
const sessionClient = new dialogflow.SessionsClient({
  credentials: {
    private_key,
    client_email
  }
});

const sessionPath = sessionClient.sessionPath('parker-pslk', uuid.v4());

const processUserMessage = async (userMessage) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userMessage,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const botResponse = responses[0].queryResult.fulfillmentText;

    return botResponse;
  } catch (error) {
    console.error('Error:', error);
    return 'Oops! Something went wrong. Please try again.'; // Default error message
  }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
module.exports = app;