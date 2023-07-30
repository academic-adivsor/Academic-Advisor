"use strict";

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
}); //model

var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
//# sourceMappingURL=Admin.dev.js.map
