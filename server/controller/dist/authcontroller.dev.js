"use strict";

var bcrypt = require('bcrypt');

var login = function login(req, res) {
  var _req$body, username, password, user, passwordMatch, token;

  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password; // Example: Check if username exists in the database

          user = getUserByUsername(username);

          if (user) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid credentials'
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 6:
          passwordMatch = _context.sent;

          if (passwordMatch) {
            // Passwords match, create and return a token or session
            token = createToken(user);
            res.status(200).json({
              message: 'Login successful',
              token: token
            });
          } else {
            res.status(401).json({
              message: 'Invalid credentials'
            });
          }

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Example function to get user by username from the database


var getUserByUsername = function getUserByUsername(username) {
  // Query the database to find the user by username
  // Return null if the user is not found
  return null;
}; // Example function to create a token


var createToken = function createToken(user) {
  // Use a library like jsonwebtoken to create a token
  // This token can be sent with future requests for authentication
  return 'exampleToken';
};

module.exports = {
  login: login
};
//# sourceMappingURL=authcontroller.dev.js.map
