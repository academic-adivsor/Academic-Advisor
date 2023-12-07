"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 64
  },
  picture: {
    type: String,
    "default": "/avatar.png"
  },
  role: {
    type: [String],
    "default": ["Student"],
    "enum": ["Student", "teacher", "Admin"]
  },
  stripe_account_id: {
    type: String,
    // Corrected this line
    "default": ""
  },
  stripe_seller: {},
  stripeSession: {}
}, {
  timestamps: true
});
module.exports = mongoose.model("User", userSchema); // Corrected this line
//# sourceMappingURL=user.dev.js.map
