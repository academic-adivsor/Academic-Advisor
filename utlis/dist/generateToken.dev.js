"use strict";

var jwt = require("jsonwebtoken");

var generateToken = function generateToken(id) {
  return jwt.sign({
    id: id
  }, "anykey", {
    expiresIn: "30d"
  });
};

module.exports = generateToken;
//# sourceMappingURL=generateToken.dev.js.map
