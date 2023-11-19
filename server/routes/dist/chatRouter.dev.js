"use strict";

var express = require("express");

var chatRouter = express.Router();

var _require = require("../utlis/dialogFlowUtils"),
    processUserMessage = _require.processUserMessage;

var serviceAccount = require('../../parker-pslk-7df273a4b799.json'); // Function to generate a session ID


var generateSessionId = function generateSessionId() {
  // Generate a unique session ID using a library or any method of your choice
  // For simplicity, you can use a timestamp or a random string
  return Date.now().toString();
};

chatRouter.post("/", function _callee(req, res) {
  var userMessage, sessionId, botResponse;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userMessage = req.body.message;
          _context.prev = 1;

          if (userMessage) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Bad Request: Missing message'
          }));

        case 4:
          // Generate a session ID
          sessionId = generateSessionId(); // Process user message with the generated session ID

          _context.next = 7;
          return regeneratorRuntime.awrap(processUserMessage(userMessage, sessionId, serviceAccount));

        case 7:
          botResponse = _context.sent;
          res.json({
            message: botResponse
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          console.error('Error:', _context.t0);
          res.status(500).json({
            message: 'Internal Server Error'
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
module.exports = chatRouter;
//# sourceMappingURL=chatRouter.dev.js.map
