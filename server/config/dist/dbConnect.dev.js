"use strict";

var mongoose = require("mongoose");

var dbConnect = function dbConnect() {
  return regeneratorRuntime.async(function dbConnect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGO_URL));

        case 3:
          console.log("DB Connected Successfully");
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log("DB Connection failed", _context.t0.message);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

dbConnect();
//# sourceMappingURL=dbConnect.dev.js.map
