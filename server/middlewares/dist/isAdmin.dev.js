"use strict";

var Admin = require("../model/staff/Admin");

var isAdmin = function isAdmin(req, res, next) {
  var userId, adminFound;
  return regeneratorRuntime.async(function isAdmin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //find the user
          userId = require.useAuth._id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Admin.findById(userId));

        case 3:
          adminFound = _context.sent;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = isAdmin;
//# sourceMappingURL=isAdmin.dev.js.map
