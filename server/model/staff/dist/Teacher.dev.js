"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var teacherSchema = new Schema({
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
  dateEmployed: {
    type: Date,
    "default": Date.now
  },
  teacherId: {
    type: String,
    required: true,
    "default": function _default() {
      return "TEA" + Math.floor(100 + Math.random() * 900) + Date.now().toString().slice(2, 4) + this.name.split(" ").map(function (name) {
        return name[0];
      }).join("").toUpperCase();
    }
  },
  //if witdrawn, the teacher will not be able to login
  isWitdrawn: {
    type: Boolean,
    "default": false
  },
  //if suspended, the teacher can login but cannot perform any task
  isSuspended: {
    type: Boolean,
    "default": false
  },
  role: {
    type: String,
    "default": "teacher"
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  }],
  applicationStatus: {
    type: String,
    "enum": ["pending", "approved", "rejected"],
    "default": "pending"
  },
  program: {
    type: String
  },
  //A teacher can teach in more than one class level
  classLevel: {
    type: String
  },
  academicYear: {
    type: String
  },
  examsCreated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin" // required: true,

  },
  academicTerm: {
    type: String
  }
}, {
  timestamps: true
}); // model

var Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
//# sourceMappingURL=Teacher.dev.js.map
