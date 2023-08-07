"use strict";

var jwt = require("jsonwebtoken");

var verifyToken = function verifyToken(token) {
  return jwt.verify(token, "anykey", function (err, decoded) {
    if (err) {
      return {
        msg: "Invalid Token"
      };
    } else {
      return decoded;
    }
  });
};

module.exports = verifyToken;
//# sourceMappingURL=verifyToken.dev.js.map
