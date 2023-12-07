"use strict";

var User = require("../model/user");

var _require = require("../utlis/helpers"),
    hashPassword = _require.hashPassword,
    comparePassword = _require.comparePassword;

var jwt = require("jsonwebtoken");

exports.logincontroller = function _callee(req, res) {
  var _req$body, email, password, user, match, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // console.log(req.body);
          _req$body = req.body, email = _req$body.email, password = _req$body.password; // check if our db has user with that email

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).exec());

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).send("No user found"));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(comparePassword(password, user.password));

        case 9:
          match = _context.sent;
          // create signed jwt
          token = jwt.sign({
            _id: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: "7d"
          }); // return user and token to client, exclude hashed password

          user.password = undefined; // send token in cookie

          res.cookie("token", token, {
            httpOnly: true // secure: true, // only works on https

          }); // send user as json response

          res.json(user);
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send("Error. Try again."));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};
//# sourceMappingURL=auth.dev.js.map
