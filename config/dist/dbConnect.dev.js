"use strict";

var mongoose = require("mongoose");

var dbConnect = function dbConnect() {
  return regeneratorRuntime.async(function dbConnect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(process.env);
          _context.next = 4;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGO_URL));

        case 4:
          console.log("DB connected successfully");
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("DB Connection failed", _context.t0.message);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

dbConnect();
//# sourceMappingURL=dbConnect.dev.js.map
