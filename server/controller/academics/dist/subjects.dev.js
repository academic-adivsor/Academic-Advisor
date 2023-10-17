"use strict";

var AysncHandler = require("express-async-handler");

var Program = require("../../model/Academic/Program");

var Subject = require("../../model/Academic/Subject");

var Admin = require("../../model/staff/Admin"); //@desc  Create subject
//@route POST /api/v1/subjects/:programID
//@acess  Private


exports.createSubject = AysncHandler(function _callee(req, res) {
  var _req$body, name, description, academicTerm, programFound, subjectFound, subjectCreated;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, academicTerm = _req$body.academicTerm; //find the program

          _context.next = 3;
          return regeneratorRuntime.awrap(Program.findById(req.params.programID));

        case 3:
          programFound = _context.sent;

          if (programFound) {
            _context.next = 6;
            break;
          }

          throw new Error("Program  not found");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(Subject.findOne({
            name: name
          }));

        case 8:
          subjectFound = _context.sent;

          if (!subjectFound) {
            _context.next = 11;
            break;
          }

          throw new Error("Subject  already exists");

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(Subject.create({
            name: name,
            description: description,
            academicTerm: academicTerm,
            createdBy: req.userAuth._id
          }));

        case 13:
          subjectCreated = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(programFound.save());

        case 16:
          res.status(201).json({
            status: "success",
            message: "Program created successfully",
            data: subjectCreated
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc  get all Subjects
//@route GET /api/v1/subjects
//@acess  Private

exports.getSubjects = AysncHandler(function _callee2(req, res) {
  var classes;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Subject.find());

        case 2:
          classes = _context2.sent;
          res.status(201).json({
            status: "success",
            message: "Subjects fetched successfully",
            data: classes
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc  get single subject
//@route GET /api/v1/subjects/:id
//@acess  Private

exports.getProgram = AysncHandler(function _callee3(req, res) {
  var program;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Subject.findById(req.params.id));

        case 2:
          program = _context3.sent;
          res.status(201).json({
            status: "success",
            message: "Subject fetched successfully",
            data: program
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //@desc   Update  Subject
//@route  PUT /api/v1/subjects/:id
//@acess  Private

exports.updatSubject = AysncHandler(function _callee4(req, res) {
  var _req$body2, name, description, academicTerm, subjectFound, subject;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, academicTerm = _req$body2.academicTerm; //check name exists

          _context4.next = 3;
          return regeneratorRuntime.awrap(Subject.findOne({
            name: name
          }));

        case 3:
          subjectFound = _context4.sent;

          if (!subjectFound) {
            _context4.next = 6;
            break;
          }

          throw new Error("Program already exists");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(Subject.findByIdAndUpdate(req.params.id, {
            name: name,
            description: description,
            academicTerm: academicTerm,
            createdBy: req.userAuth._id
          }, {
            "new": true
          }));

        case 8:
          subject = _context4.sent;
          res.status(201).json({
            status: "success",
            message: "subject  updated successfully",
            data: subject
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //@desc   Delete  Subject
//@route  PUT /api/v1/subjects/:id
//@acess  Private

exports.deleteSubject = AysncHandler(function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Subject.findByIdAndDelete(req.params.id));

        case 2:
          res.status(201).json({
            status: "success",
            message: "subject deleted successfully"
          });

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
//# sourceMappingURL=subjects.dev.js.map
