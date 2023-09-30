"use strict";

var AsyncHandler = require("express-async-handler");

var bcrypt = require("bcryptjs");

var Admin = require("../../model/staff/Admin");

var generateToken = require("../../utlis/generateToken");

var verifyToken = require("../../utlis/verifyToken");

var _require = require("../../utlis/helpers"),
    hashPassword = _require.hashPassword,
    isPassMatched = _require.isPassMatched; //desc register admin
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
          _context.t0 = regeneratorRuntime;
          _context.t1 = Admin;
          _context.t2 = name;
          _context.t3 = email;
          _context.next = 12;
          return regeneratorRuntime.awrap(hashPassword(password));

        case 12:
          _context.t4 = _context.sent;
          _context.t5 = {
            name: _context.t2,
            email: _context.t3,
            password: _context.t4
          };
          _context.t6 = _context.t1.create.call(_context.t1, _context.t5);
          _context.next = 17;
          return _context.t0.awrap.call(_context.t0, _context.t6);

        case 17:
          user = _context.sent;
          res.status(201).json({
            status: "success",
            data: user,
            message: "Admin registered successfully"
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
}); //@desc login admin
//@route POST /api/v1/admins/login
//@access Private

exports.loginAdminCtrl = AsyncHandler(function _callee2(req, res) {
  var _req$body2, email, password, user, isMatched;

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
          _context2.next = 8;
          return regeneratorRuntime.awrap(isPassMatched(password, user.password));

        case 8:
          isMatched = _context2.sent;

          if (isMatched) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.json({
            message: "Invalid login crendentials"
          }));

        case 13:
          return _context2.abrupt("return", res.json({
            data: generateToken(user._id),
            message: "Admin Logged in successfully"
          }));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //@desc Get all admin
//@route GET /api/v1/admins
//@access Private

exports.getAdminsCtrl = AsyncHandler(function _callee3(req, res) {
  var admins;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Admin.findOne());

        case 2:
          admins = _context3.sent;
          res.status(200).json({
            status: "success",
            message: "Admins Fetched successfully",
            data: admins
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //@desc Get single admin
//@route GET /api/v1/admins/:id
//@access Private

exports.getAdminProfileCtrl = AsyncHandler(function _callee4(req, res) {
  var admin;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Admin.findById(req.userAuth._id).select("-password -createdAt -updatedAt"));

        case 2:
          admin = _context4.sent;

          if (admin) {
            _context4.next = 7;
            break;
          }

          throw new Error("Admin not found");

        case 7:
          res.status(200).json({
            status: "success",
            data: admin,
            message: "Admin Profile Fetched successfully"
          });

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //@desc update admin
//@route UPDATE /api/v1/admins/:id
//@access Private

exports.updateAdminCtrl = AsyncHandler(function _callee5(req, res) {
  var _req$body3, email, name, password, emailExist, admin, _admin;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, email = _req$body3.email, name = _req$body3.name, password = _req$body3.password; //if email is taken

          _context5.next = 3;
          return regeneratorRuntime.awrap(Admin.findOne({
            email: email
          }));

        case 3:
          emailExist = _context5.sent;

          if (!emailExist) {
            _context5.next = 6;
            break;
          }

          throw new Error("This email is taken/exist");

        case 6:
          if (!password) {
            _context5.next = 24;
            break;
          }

          _context5.t0 = regeneratorRuntime;
          _context5.t1 = Admin;
          _context5.t2 = req.userAuth._id;
          _context5.t3 = email;
          _context5.next = 13;
          return regeneratorRuntime.awrap(hashPassword(password));

        case 13:
          _context5.t4 = _context5.sent;
          _context5.t5 = name;
          _context5.t6 = {
            email: _context5.t3,
            password: _context5.t4,
            name: _context5.t5
          };
          _context5.t7 = {
            "new": true,
            runValidators: true
          };
          _context5.t8 = _context5.t1.findByIdAndUpdate.call(_context5.t1, _context5.t2, _context5.t6, _context5.t7);
          _context5.next = 20;
          return _context5.t0.awrap.call(_context5.t0, _context5.t8);

        case 20:
          admin = _context5.sent;
          res.status(200).json({
            status: "success",
            data: admin,
            message: "Admin updated successfully"
          });
          _context5.next = 28;
          break;

        case 24:
          _context5.next = 26;
          return regeneratorRuntime.awrap(Admin.findByIdAndUpdate(req.userAuth._id, {
            email: email,
            name: name
          }, {
            "new": true,
            runValidators: true
          }));

        case 26:
          _admin = _context5.sent;
          res.status(200).json({
            status: "success",
            data: _admin,
            message: "Admin updated successfully"
          });

        case 28:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //@desc delete admin
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
