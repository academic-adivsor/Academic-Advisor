"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema; //questionSchema

var questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  optionA: {
    type: String,
    required: true
  },
  optionB: {
    type: String,
    required: true
  },
  optionC: {
    type: String,
    required: true
  },
  optionD: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    "default": true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  }
}, {
  timestamps: true
});
var Question = mongoose.model("Question", questionSchema);
module.exports = Question;
//# sourceMappingURL=Questions.dev.js.map
