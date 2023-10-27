"use strict";

var AysncHandler = require("express-async-handler");

var ClassLevel = require("../../model/Academic/ClassLevel");

var Program = require("../../model/Academic/Program");

var Admin = require("../../model/staff/Admin"); //@desc  Create Program
//@route POST /api/v1/programs
//@acess  Private


exports.createProgram = AysncHandler(function _callee(req, res) {
  var _req$body, name, description, programFound, programCreated, admin;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description; //check if exists

          _context.next = 3;
          return regeneratorRuntime.awrap(Program.findOne({
            name: name
          }));

        case 3:
          programFound = _context.sent;

          if (!programFound) {
            _context.next = 6;
            break;
          }

          throw new Error("Program  already exists");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(Program.create({
            name: name,
            description: description,
            createdBy: req.userAuth._id
          }));

        case 8:
          programCreated = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Admin.findById(req.userAuth._id));

        case 11:
          admin = _context.sent;
          admin.programs.push(programCreated._id); //save

          _context.next = 15;
          return regeneratorRuntime.awrap(admin.save());

        case 15:
          res.status(201).json({
            status: "success",
            message: "Program created successfully",
            data: programCreated
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc  get all Programs
//@route GET /api/v1/programs
//@acess  Private

exports.getPrograms = AysncHandler(function _callee2(req, res) {
  var classes;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Program.find());

        case 2:
          classes = _context2.sent;
          res.status(201).json({
            status: "success",
            message: "Programs fetched successfully",
            data: classes
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc  get single Program
//@route GET /api/v1/programs/:id
//@acess  Private

exports.getProgram = AysncHandler(function _callee3(req, res) {
  var program;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Program.findById(req.params.id));

        case 2:
          program = _context3.sent;
          res.status(201).json({
            status: "success",
            message: "Program fetched successfully",
            data: program
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //@desc   Update  Program
//@route  PUT /api/v1/programs/:id
//@acess  Private

exports.updatProgram = AysncHandler(function _callee4(req, res) {
  var _req$body2, name, description, programFound, program;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description; //check name exists

          _context4.next = 3;
          return regeneratorRuntime.awrap(ClassLevel.findOne({
            name: name
          }));

        case 3:
          programFound = _context4.sent;

          if (!programFound) {
            _context4.next = 6;
            break;
          }

          throw new Error("Program already exists");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(Program.findByIdAndUpdate(req.params.id, {
            name: name,
            description: description,
            createdBy: req.userAuth._id
          }, {
            "new": true
          }));

        case 8:
          program = _context4.sent;
          res.status(201).json({
            status: "success",
            message: "Program  updated successfully",
            data: program
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //@desc   Delete  Program
//@route  PUT /api/v1/programs/:id
//@acess  Private

exports.deleteProgram = AysncHandler(function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Program.findByIdAndDelete(req.params.id));

        case 2:
          res.status(201).json({
            status: "success",
            message: "Program deleted successfully"
          });

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
//# sourceMappingURL=programs.dev.js.map
