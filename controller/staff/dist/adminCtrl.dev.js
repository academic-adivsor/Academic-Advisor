"use strict";

var Admin = require("../../model/staff/Admin"); //desc register admin
//router POST /api/admin/register
//@aces Private


exports.registerAdmnCtrl = function _callee(req, res) {
  var adminfound, _req$body, name, email, password, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Admin.findOne({
            email: email
          }));

        case 2:
          adminfound = _context.sent;

          if (AdminFound) {
            res.json("Admin Exists");
          }

          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.prev = 5;
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
            data: "admin has been registered"
          });
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          res.json({
            status: "failed",
            error: _context.t0.message
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
}; //@desc login admin
//@route POST /api/v1/admins/login
//@access Private


exports.loginAdminCtrl = function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "admin has been login"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}; //@desc Get all admin
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
