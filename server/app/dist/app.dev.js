"use strict";

require("../config/dbConnect");

var private_key = process.env.DIALOGFLOW_PRIVATE_KEY;
var client_email = process.env.DIALOGFLOW_CLIENT_EMAIL;

var express = require("express");

var bodyParser = require('body-parser');

var morgan = require("morgan");

var cors = require('cors');

var app = express();

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

var chatRouter = require("../routes/chatRouter");

app.use(require('../routes/chatRouter'));
app.use(express.json());
app.use(bodyParser.json()); //routes
//admin register

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/chat", chatRouter); //Error middlewares

app.use(notFoundErr);
app.use(globalErrHandler);
var whitelist = ['file:///C:/Users/Hussein/OneDrive%20-%20MAM%20(Faculty%20of%20Computer%20Science)/Desktop/FGP/AA/client/Admin-Dashboard/index.html', 'file:///C:/Users/Hussein/OneDrive%20-%20MAM%20(Faculty%20of%20Computer%20Science)/Desktop/FGP/AA/client/Student-Dashboard-main/index.html', 'file:///C:/Users/Hussein/OneDrive%20-%20MAM%20(Faculty%20of%20Computer%20Science)/Desktop/FGP/AA/client/Doctor_DashBord/index.html', 'file:///C:/Users/Hussein/OneDrive%20-%20MAM%20(Faculty%20of%20Computer%20Science)/Desktop/FGP/AA/client/index.html'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

var dialogflow = require('dialogflow');

var uuid = require('uuid'); // Initialize session client


var sessionClient = new dialogflow.SessionsClient({
  credentials: {
    private_key: private_key,
    client_email: client_email
  }
});
var sessionPath = sessionClient.sessionPath('parker-pslk', uuid.v4());

var processUserMessage = function processUserMessage(userMessage) {
  var request, responses, botResponse;
  return regeneratorRuntime.async(function processUserMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          request = {
            session: sessionPath,
            queryInput: {
              text: {
                text: userMessage,
                languageCode: 'en-US'
              }
            }
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(sessionClient.detectIntent(request));

        case 4:
          responses = _context.sent;
          botResponse = responses[0].queryResult.fulfillmentText;
          return _context.abrupt("return", botResponse);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.error('Error:', _context.t0);
          return _context.abrupt("return", 'Oops! Something went wrong. Please try again.');

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
module.exports = app;
//# sourceMappingURL=app.dev.js.map
