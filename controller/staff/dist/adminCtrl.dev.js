"use strict";

var AsyncHandler = require("express-async-handler");

var Admin = require("../../model/staff/Admin");

var generateToken = require("../../utlis/generateToken");

var verifyToken = require("../../utlis/verifyToken"); //desc register admin
//router POST /api/admin/register
//@aces Private


exports.registerAdmnCtrl = AsyncHandler(function _callee(req, res) {
  var _req$body, name, email, password, adminFound, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password; //check if email exists

          _context.next = 3;
          return regeneratorRuntime.awrap(Admin.findOne({
            email: email
          }));

        case 3:
          adminFound = _context.sent;

          if (!adminFound) {
            _context.next = 6;
            break;
          }

          throw new Error("Admin Exists");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(Admin.create({
            name: name,
            email: email,
            password: password
          }));

        case 8:
          user = _context.sent;
          res.status(201).json({
            status: "success",
            data: user
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc login admin
//@route POST /api/v1/admins/login
//@access Private

exports.loginAdminCtrl = AsyncHandler(function _callee2(req, res) {
  var _req$body2, email, password, user, token, verify;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; //find user

          _context2.next = 3;
          return regeneratorRuntime.awrap(Admin.findOne({
            email: email
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.json({
            message: "Invalid login crendentials"
          }));

        case 6:
          _context2.t0 = user;

          if (!_context2.t0) {
            _context2.next = 11;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(user.verifyPassword(password));

        case 10:
          _context2.t0 = _context2.sent;

        case 11:
          if (!_context2.t0) {
            _context2.next = 17;
            break;
          }

          token = generateToken(user._id);
          verify = verifyToken(token);
          return _context2.abrupt("return", res.json({
            data: generateToken(user._id),
            user: user,
            verify: verify
          }));

        case 17:
          return _context2.abrupt("return", res.json({
            message: "Invalid login crendentials"
          }));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc Get all admin
//@route GET /api/v1/admins
//@access Private

exports.getAdminsCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "All admins"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}; //@desc Get single admin
//@route GET /api/v1/admins/:id
//@access Private


exports.getAdminCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "added single admin"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}; //@desc update admin
//@route UPDATE /api/v1/admins/:id
//@access Private


exports.updateAdminCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "update admin"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}; //@desc delete admin
//@route DELETE /api/v1/admins/:id
//@access Private


exports.deleteAdminCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "delete admin"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}; //@desc admin suspend a teacher
//@route PUT /api/v1/admins/suspend/teacher:id
//@access Private


exports.adminSuspendTeacherCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "admin suspend teacher"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}; //@desc admin unsuspend a teacher
//@route PUT /api/v1/admins/unsuspend/teacher:id
//@access Private


exports.adminUnSuspendTeacherCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unsuspend teacher"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}; //@desc admin withdraws a teacher
//@route PUT /api/v1/admins/withdraws/teacher:id
//@access Private


exports.adminWithdrawTeacherCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "admin withdraw teacher"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}; //@desc admin unwithdraws a teacher
//@route PUT /api/v1/admins/unwithdraws/teacher:id
//@access Private


exports.adminUnWithdrawTeacherCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unwithdraw teacher"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}; //@desc admin publish exam results
//@route PUT /api/v1/admins/publish/exam:id
//@access Private


exports.adminPublishResultsCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "admin publish exam results"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}; //@desc admin unpublish exam results
//@route PUT /api/v1/admins/unpublish/exam:id
//@access Private


exports.adminUnPublishResultsCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unpublish exam results"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
};
//# sourceMappingURL=adminCtrl.dev.js.map
