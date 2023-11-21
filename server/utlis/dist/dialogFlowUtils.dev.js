"use strict";

var _require = require('@google-cloud/dialogflow'),
    SessionsClient = _require.SessionsClient;

var processUserMessage = function processUserMessage(userMessage, sessionId, serviceAccount) {
  var sessionClient, session, queryInput, responses;
  return regeneratorRuntime.async(function processUserMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('userMessage:', userMessage);
          console.log('sessionId:', sessionId);
          console.log('serviceAccount:', serviceAccount);
          sessionClient = new SessionsClient({
            credentials: serviceAccount
          });
          session = sessionClient.projectAgentSessionPath('parker-pslk', sessionId);
          queryInput = {
            text: {
              text: userMessage,
              languageCode: 'en-US'
            }
          };
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(sessionClient.detectIntent({
            session: session,
            queryInput: queryInput
          }));

        case 9:
          responses = _context.sent;
          return _context.abrupt("return", responses[0].queryResult.fulfillmentText);

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](6);
          console.error('Error:', _context.t0);
          return _context.abrupt("return", 'Oops! Something went wrong. Please try again.');

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 13]]);
};

module.exports = {
  processUserMessage: processUserMessage
};
//# sourceMappingURL=dialogFlowUtils.dev.js.map
