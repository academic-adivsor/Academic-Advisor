"use strict";

// chatRoute.js
var express = require('express');

var router = express.Router();

var _require = require('../utlis/dialogFlowUtils'),
    processUserMessage = _require.processUserMessage; // Replace with the actual path


router.post('/api/v1/chat', function _callee(req, res) {
  var userMessage, botResponse;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userMessage = req.body.message;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(processUserMessage(userMessage, sessionId));

        case 4:
          botResponse = _context.sent;
          res.json({
            message: botResponse
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error('Error:', _context.t0);
          res.status(500).json({
            message: 'Internal Server Error'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;
//# sourceMappingURL=chatRoute.dev.js.map
