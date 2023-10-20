"use strict";

var AysncHandler = require("express-async-handler");

var Program = require("../../model/Academic/Program");

var Subject = require("../../model/Academic/Subject");

var YearGroup = require("../../model/Academic/YearGroup");

var Admin = require("../../model/staff/Admin"); //@desc  Create year group
//@route POST /api/v1/year-groups
//@acess  Private


exports.createYearGroup = AysncHandler(function _callee(req, res) {
  var _req$body, name, academicYear, yeargroup, yearGroup, admin;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, academicYear = _req$body.academicYear; //check if exists

          _context.next = 3;
          return regeneratorRuntime.awrap(YearGroup.findOne({
            name: name
          }));

        case 3:
          yeargroup = _context.sent;

          if (!yeargroup) {
            _context.next = 6;
            break;
          }

          throw new Error("Year Group/Graduation   already exists");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(YearGroup.create({
            name: name,
            academicYear: academicYear,
            createdBy: req.userAuth._id
          }));

        case 8:
          yearGroup = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Admin.findById(req.userAuth._id));

        case 11:
          admin = _context.sent;

          if (admin) {
            _context.next = 14;
            break;
          }

          throw new Error("Admin not found");

        case 14:
          //push year froup into admin
          admin.yearGroups.push(yearGroup._id); //save

          _context.next = 17;
          return regeneratorRuntime.awrap(admin.save());

        case 17:
          res.status(201).json({
            status: "success",
            message: "Year Group created successfully",
            data: yearGroup
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc  get all Year grups
//@route GET /api/v1/year-groups
//@acess  Private

exports.getYearGroups = AysncHandler(function _callee2(req, res) {
  var groups;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(YearGroup.find());

        case 2:
          groups = _context2.sent;
          res.status(201).json({
            status: "success",
            message: "Year Groups fetched successfully",
            data: groups
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc  get single year group
//@route GET /api/v1/year-group/:id
//@acess  Private

exports.getYearGroup = AysncHandler(function _callee3(req, res) {
  var group;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(YearGroup.findById(req.params.id));

        case 2:
          group = _context3.sent;
          res.status(201).json({
            status: "success",
            message: "Year Group fetched successfully",
            data: group
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //@desc   Update  Year Group
//@route  PUT /api/v1/year-groups/:id
//@acess  Private

exports.updateYearGroup = AysncHandler(function _callee4(req, res) {
  var _req$body2, name, academicYear, yearGroupFound, yearGroup;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, academicYear = _req$body2.academicYear; //check name exists

          _context4.next = 3;
          return regeneratorRuntime.awrap(YearGroup.findOne({
            name: name
          }));

        case 3:
          yearGroupFound = _context4.sent;

          if (!yearGroupFound) {
            _context4.next = 6;
            break;
          }

          throw new Error("year Group already exists");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(YearGroup.findByIdAndUpdate(req.params.id, {
            name: name,
            academicYear: academicYear,
            createdBy: req.userAuth._id
          }, {
            "new": true
          }));

        case 8:
          yearGroup = _context4.sent;
          res.status(201).json({
            status: "success",
            message: "Year Group  updated successfully",
            data: yearGroup
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //@desc   Delete  Year group
//@route  PUT /api/v1/year-groups/:id
//@acess  Private

exports.deleteYearGroup = AysncHandler(function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(YearGroup.findByIdAndDelete(req.params.id));

        case 2:
          res.status(201).json({
            status: "success",
            message: "Year Group deleted successfully"
          });

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
//# sourceMappingURL=yearGroups.dev.js.map
