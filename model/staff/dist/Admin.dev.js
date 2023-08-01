"use strict";

var bcrypt = require("bcryptjs");

var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "default": "admin"
  }
}, {
  timestamps: true
}); //Hash password

adminSchema.pre("save", function _callee(next) {
  var salt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!this.isModified("password")) {
            next();
          } //salt


          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, salt));

        case 6:
          this.password = _context.sent;
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); //verifyPassword

adminSchema.methods.verifyPassword = function _callee2(enteredPassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(enteredPassword, this.password));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
}; //model


var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
//# sourceMappingURL=Admin.dev.js.map
