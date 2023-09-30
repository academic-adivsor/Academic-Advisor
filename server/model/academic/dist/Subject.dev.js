"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var subjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  teachers: {
    type: Schema.Types.ObjectId,
    ref: "Teacher"
  },
  academicTerm: {
    type: Schema.Types.ObjectId,
    ref: "AcademicTerm",
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  duration: {
    type: String,
    required: true,
    "default": "3 months"
  }
}, {
  timestamps: true
});
var Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
//# sourceMappingURL=Subject.dev.js.map
