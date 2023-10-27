"use strict";

var AysncHandler = require("express-async-handler");

var AcademicTerm = require("../../model/Academic/AcademicTerm");

var Admin = require("../../model/staff/Admin"); //@desc Create Academic Term Year
//@route POST /api/v1/academic-terms
//@acess  Private


exports.createAcademicTerm = AysncHandler(function _callee(req, res) {
  var _req$body, name, description, duration, academicTerm, academicTermCreated, admin;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, description = _req$body.description, duration = _req$body.duration; //check if exists

          _context.next = 3;
          return regeneratorRuntime.awrap(AcademicTerm.findOne({
            name: name
          }));

        case 3:
          academicTerm = _context.sent;

          if (!academicTerm) {
            _context.next = 6;
            break;
          }

          throw new Error("Academic term already exists");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(AcademicTerm.create({
            name: name,
            description: description,
            duration: duration,
            createdBy: req.userAuth._id
          }));

        case 8:
          academicTermCreated = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Admin.findById(req.userAuth._id));

        case 11:
          admin = _context.sent;
          admin.academicTerms.push(academicTermCreated._id);
          _context.next = 15;
          return regeneratorRuntime.awrap(admin.save());

        case 15:
          res.status(201).json({
            status: "success",
            message: "Academic term created successfully",
            data: academicTermCreated
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc  get all Academic terms
//@route GET /api/v1/academic-terms
//@acess  Private

exports.getAcademicTerms = AysncHandler(function _callee2(req, res) {
  var academicTerms;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(AcademicTerm.find());

        case 2:
          academicTerms = _context2.sent;
          res.status(201).json({
            status: "success",
            message: "Academic terms fetched successfully",
            data: academicTerms
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc  get single Academic term
//@route GET /api/v1/academic-terms/:id
//@acess  Private

exports.getAcademicTerm = AysncHandler(function _callee3(req, res) {
  var academicTerms;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(AcademicTerm.findById(req.params.id));

        case 2:
          academicTerms = _context3.sent;
          res.status(201).json({
            status: "success",
            message: "Academic terms fetched successfully",
            data: academicTerms
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //@desc   Update  Academic term
//@route  PUT /api/v1/academic-terms/:id
//@acess  Private

exports.updateAcademicTerms = AysncHandler(function _callee4(req, res) {
  var _req$body2, name, description, duration, createAcademicTermFound, academicTerms;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, duration = _req$body2.duration; //check name exists

          _context4.next = 3;
          return regeneratorRuntime.awrap(AcademicTerm.findOne({
            name: name
          }));

        case 3:
          createAcademicTermFound = _context4.sent;

          if (!createAcademicTermFound) {
            _context4.next = 6;
            break;
          }

          throw new Error("Academic terms= already exists");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(AcademicTerm.findByIdAndUpdate(req.params.id, {
            name: name,
            description: description,
            duration: duration,
            createdBy: req.userAuth._id
          }, {
            "new": true
          }));

        case 8:
          academicTerms = _context4.sent;
          res.status(201).json({
            status: "success",
            message: "Academic term updated successfully",
            data: academicTerms
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //@desc   Delete  Academic term
//@route  PUT /api/v1/academic-terms/:id
//@acess  Private

exports.deleteAcademicTerm = AysncHandler(function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(AcademicTerm.findByIdAndDelete(req.params.id));

        case 2:
          res.status(201).json({
            status: "success",
            message: "Academic term deleted successfully"
          });

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
//# sourceMappingURL=academicTermCtrl.dev.js.map
