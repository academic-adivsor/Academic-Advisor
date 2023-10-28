"use strict";

var _require = require('dialogflow'),
    SessionsClient = _require.SessionsClient;

var processUserMessage = function processUserMessage(userMessage, sessionId, serviceAccount) {
  var sessionClient, session, queryInput, responses;
  return regeneratorRuntime.async(function processUserMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sessionClient = new SessionsClient({
            credentials: serviceAccount
          });
          session = sessionClient.sessionPath('parker-pslk', sessionId);
          queryInput = {
            text: {
              text: userMessage,
              languageCode: 'en-US'
            }
          };
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(sessionClient.detectIntent({
            session: session,
            queryInput: queryInput
          }));

        case 6:
          responses = _context.sent;
          return _context.abrupt("return", responses[0].queryResult.fulfillmentText);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          console.error('Error:', _context.t0);
          return _context.abrupt("return", 'Oops! Something went wrong. Please try again.');

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

module.exports = {
  processUserMessage: processUserMessage
};
//# sourceMappingURL=dialogFlowUtils.dev.js.map
