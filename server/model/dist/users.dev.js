"use strict";

// user.js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  // ... your other fields
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
  } // ... your other fields

}, {
  timestamps: true
});
var User = mongoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=users.dev.js.map
