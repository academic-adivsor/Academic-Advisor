"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _auth = require("../utils/auth");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var register = function register(req, res) {
  var _req$body, name, email, password, userExist, hashedPassword, user;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // console.log(req.body);
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password; // validation

          if (name) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Name is required"));

        case 4:
          if (!(!password || password.length < 6)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Password is required and should be min 6 characters long"));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_user["default"].findOne({
            email: email
          }).exec());

        case 8:
          userExist = _context.sent;

          if (!userExist) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Email is taken"));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap((0, _auth.hashPassword)(password));

        case 13:
          hashedPassword = _context.sent;
          // register
          user = new _user["default"]({
            name: name,
            email: email,
            password: hashedPassword
          });
          _context.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          return _context.abrupt("return", res.json({
            ok: true
          }));

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send("Error. Try again."));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.register = register;
//# sourceMappingURL=auth.dev.js.map
