"use strict";

var Admin = require("../model/staff/Admin");

var verifyToken = require("../utlis/verifyToken");

var isLogin = function isLogin(req, res, next) {
  var headerObj, verifiedToken, user, err;
  return regeneratorRuntime.async(function isLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //get token from header
          headerObj = req.headers; // const token = headerObj?.authorization?.split(" ")[1];
          //verify token

          verifiedToken = verifyToken(token);

          if (!verifiedToken) {
            _context.next = 10;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(Admin.findById(verifiedToken.id).select("name email role"));

        case 5:
          user = _context.sent;
          //save the user into req.obj
          req.userAuth = user;
          next();
          _context.next = 12;
          break;

        case 10:
          err = new Error("Token expired/invalid");
          next(err);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = isLogin;
//# sourceMappingURL=isLogin.dev.js.map
