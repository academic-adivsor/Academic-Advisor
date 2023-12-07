"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.hashPassword = void 0;

var bcrypt = require("bcrypt");

var hashPassword = function hashPassword(password) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(12, function (err, salt) {
      if (err) {
        reject(err);
      }

      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          reject(err);
        }

        resolve(hash);
      });
    });
  });
};

exports.hashPassword = hashPassword;

var comparePassword = function comparePassword(password, hashed) {
  return bcrypt.compare(password, hashed); // boolean
};

exports.comparePassword = comparePassword;
//# sourceMappingURL=auth.dev.js.map
