"use strict";

var AysncHandler = require("express-async-handler");

var AcademicYear = require("../../model/Academic/AcademicYear");

var Admin = require("../../model/staff/Admin"); //@desc Create Academic Year
//@route POST /api/v1/academic-years
//@acess  Private


exports.createAcademicYear = AysncHandler(function _callee(req, res) {
  var _req$body, name, fromYear, toYear, academicYear, academicYearCreated, admin;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, fromYear = _req$body.fromYear, toYear = _req$body.toYear; //check if exists

          _context.next = 3;
          return regeneratorRuntime.awrap(AcademicYear.findOne({
            name: name
          }));

        case 3:
          academicYear = _context.sent;

          if (!academicYear) {
            _context.next = 6;
            break;
          }

          throw new Error("Academic year already exists");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(AcademicYear.create({
            name: name,
            fromYear: fromYear,
            toYear: toYear,
            createdBy: req.userAuth._id
          }));

        case 8:
          academicYearCreated = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Admin.findById(req.userAuth._id));

        case 11:
          admin = _context.sent;
          admin.academicYears.push(academicYearCreated._id);
          _context.next = 15;
          return regeneratorRuntime.awrap(admin.save());

        case 15:
          res.status(201).json({
            status: "success",
            message: "Academic year created successfully",
            data: academicYearCreated
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc  get all Academic Years
//@route GET /api/v1/academic-years
//@acess  Private

exports.getAcademicYears = AysncHandler(function _callee2(req, res) {
  var academicYears;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(AcademicYear.find());

        case 2:
          academicYears = _context2.sent;
          res.status(201).json({
            status: "success",
            message: "Academic years fetched successfully",
            data: academicYears
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc  get single Academic Year
//@route GET /api/v1/academic-years/:id
//@acess  Private

exports.getAcademicYear = AysncHandler(function _callee3(req, res) {
  var academicYears;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(AcademicYear.findById(req.params.id));

        case 2:
          academicYears = _context3.sent;
          res.status(201).json({
            status: "success",
            message: "Academic years fetched successfully",
            data: academicYears
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //@desc   Update  Academic Year
//@route  PUT /api/v1/academic-years/:id
//@acess  Private

exports.updateAcademicYear = AysncHandler(function _callee4(req, res) {
  var _req$body2, name, fromYear, toYear, createAcademicYearFound, academicYear;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, fromYear = _req$body2.fromYear, toYear = _req$body2.toYear; //check name exists

          _context4.next = 3;
          return regeneratorRuntime.awrap(AcademicYear.findOne({
            name: name
          }));

        case 3:
          createAcademicYearFound = _context4.sent;

          if (!createAcademicYearFound) {
            _context4.next = 6;
            break;
          }

          throw new Error("Academic year already exists");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(AcademicYear.findByIdAndUpdate(req.params.id, {
            name: name,
            fromYear: fromYear,
            toYear: toYear,
            createdBy: req.userAuth._id
          }, {
            "new": true
          }));

        case 8:
          academicYear = _context4.sent;
          res.status(201).json({
            status: "success",
            message: "Academic years updated successfully",
            data: academicYear
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //@desc   Update  Academic Year
//@route  PUT /api/v1/academic-years/:id
//@acess  Private

exports.deleteAcademicYear = AysncHandler(function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(AcademicYear.findByIdAndDelete(req.params.id));

        case 2:
          res.status(201).json({
            status: "success",
            message: "Academic year deleted successfully"
          });

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
//# sourceMappingURL=academicYearCtrl.dev.js.map
