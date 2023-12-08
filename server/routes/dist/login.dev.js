"use strict";

// authController.js
var mongoose = require('mongoose');

var login = function login(req, res) {
  var _req$body, email, password, user;

  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email,
            password: password
          }));

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid credentials'
          }));

        case 7:
          // Redirect to the appropriate dashboard based on the role
          if (user.role === 'admin') {
            res.redirect('/Admin-Dashboard');
          } else if (user.role === 'student') {
            res.redirect('/Student-Dashboard-main');
          } else if (user.role === 'teacher') {
            res.redirect('/Doctor-Dashboard');
          }

          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

module.exports = {
  login: login
};
//# sourceMappingURL=login.dev.js.map
