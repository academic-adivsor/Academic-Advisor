"use strict";

var express = require('express');

var chatRouter = express.Router();

var _require = require('../utlis/dialogFlowUtils'),
    processUserMessage = _require.processUserMessage;

chatRouter.post("/chat", function _callee(req, res) {
  var userMessage, botResponse;
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
          _context.next = 6;
          return regeneratorRuntime.awrap(processUserMessage(userMessage));

        case 6:
          botResponse = _context.sent;
          res.json({
            message: botResponse
          });
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error('Error:', _context.t0);
          res.status(500).json({
            message: 'Internal Server Error'
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
module.exports = chatRouter;
//# sourceMappingURL=chatRouter.dev.js.map
