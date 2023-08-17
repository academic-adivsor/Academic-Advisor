"use strict";

var bcrypt = require("bcryptjs");

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
  },
  academicTerms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicTerm"
  }],
  programs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program"
  }],
  yearGroups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "YearGroup"
  }],
  academicYears: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicYear"
  }],
  classLevels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassLevel"
  }],
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }]
}, {
  timestamps: true
}); //model

var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
//# sourceMappingURL=Admin.dev.js.map
