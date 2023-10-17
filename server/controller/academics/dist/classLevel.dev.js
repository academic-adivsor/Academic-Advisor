"use strict";

var AysncHandler = require("express-async-handler");

var ClassLevel = require("../../model/Academic/ClassLevel");

var Admin = require("../../model/staff/Admin"); //@desc  Create Class Level
//@route POST /api/v1/class-levels
//@acess  Private


exports.createClassLevel = AysncHandler(function _callee(req, res) {
  var _req$body, name, description, duration, classFound, classCreated, admin;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, duration = _req$body.duration; //check if exists

          _context.next = 3;
          return regeneratorRuntime.awrap(ClassLevel.findOne({
            name: name
          }));

        case 3:
          classFound = _context.sent;

          if (!classFound) {
            _context.next = 6;
            break;
          }

          throw new Error("Class  already exists");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(ClassLevel.create({
            name: name,
            description: description,
            createdBy: req.userAuth._id
          }));

        case 8:
          classCreated = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Admin.findById(req.userAuth._id));

        case 11:
          admin = _context.sent;
          admin.classLevels.push(classCreated._id); //save

          _context.next = 15;
          return regeneratorRuntime.awrap(admin.save());

        case 15:
          res.status(201).json({
            status: "success",
            message: "Class created successfully",
            data: classCreated
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc  get all class levels
//@route GET /api/v1/class-levels
//@acess  Private

exports.getClassLevels = AysncHandler(function _callee2(req, res) {
  var classes;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(ClassLevel.find());

        case 2:
          classes = _context2.sent;
          res.status(201).json({
            status: "success",
            message: "Class Levels fetched successfully",
            data: classes
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc  get single Class level
//@route GET /api/v1/class-levels/:id
//@acess  Private

exports.getClassLevel = AysncHandler(function _callee3(req, res) {
  var classLevel;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(ClassLevel.findById(req.params.id));

        case 2:
          classLevel = _context3.sent;
          res.status(201).json({
            status: "success",
            message: "Class fetched successfully",
            data: classLevel
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //@desc   Update  Class Level
//@route  PUT /api/v1/class-levels/:id
//@acess  Private

exports.updateclassLevel = AysncHandler(function _callee4(req, res) {
  var _req$body2, name, description, classFound, classLevel;

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
          classFound = _context4.sent;

          if (!classFound) {
            _context4.next = 6;
            break;
          }

          throw new Error("Class already exists");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(ClassLevel.findByIdAndUpdate(req.params.id, {
            name: name,
            description: description,
            createdBy: req.userAuth._id
          }, {
            "new": true
          }));

        case 8:
          classLevel = _context4.sent;
          res.status(201).json({
            status: "success",
            message: "Class  updated successfully",
            data: classLevel
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //@desc   Delete  class level
//@route  PUT /api/v1/aclass-levels/:id
//@acess  Private

exports.deleteClassLevel = AysncHandler(function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(ClassLevel.findByIdAndDelete(req.params.id));

        case 2:
          res.status(201).json({
            status: "success",
            message: "Class level deleted successfully"
          });

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
//# sourceMappingURL=classLevel.dev.js.map
