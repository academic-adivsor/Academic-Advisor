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
const chatRoute = require("../routes/chatRoute");
app.use(require('../routes/chatRoute'));
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
app.use("/api/v1/chat", chatRoute);
//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);
const whitelist = [
  'file:///C:/Users/Hussein/OneDrive%20-%20MAM%20(Faculty%20of%20Computer%20Science)/Desktop/FGP/AA/client/Admin-Dashboard/index.html',
  'file:///C:/Users/Hussein/OneDrive%20-%20MAM%20(Faculty%20of%20Computer%20Science)/Desktop/FGP/AA/client/Student-Dashboard-main/index.html',
  'file:///C:/Users/Hussein/OneDrive%20-%20MAM%20(Faculty%20of%20Computer%20Science)/Desktop/FGP/AA/client/Doctor_DashBord/index.html',
  'file:///C:/Users/Hussein/OneDrive%20-%20MAM%20(Faculty%20of%20Computer%20Science)/Desktop/FGP/AA/client/index.html',

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