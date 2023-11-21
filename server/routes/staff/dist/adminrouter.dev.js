"use strict";

var express = require("express");

var _require = require("../../controller/staff/adminCtrl"),
    registerAdmnCtrl = _require.registerAdmnCtrl,
    adminPublishResultsCtrl = _require.adminPublishResultsCtrl,
    adminSuspendTeacherCtrl = _require.adminSuspendTeacherCtrl,
    adminUnPublishResultsCtrl = _require.adminUnPublishResultsCtrl,
    adminUnSuspendTeacherCtrl = _require.adminUnSuspendTeacherCtrl,
    adminUnWithdrawTeacherCtrl = _require.adminUnWithdrawTeacherCtrl,
    adminWithdrawTeacherCtrl = _require.adminWithdrawTeacherCtrl,
    getAdminsCtrl = _require.getAdminsCtrl,
    loginAdminCtrl = _require.loginAdminCtrl,
    updateAdminCtrl = _require.updateAdminCtrl,
    deleteAdminCtrl = _require.deleteAdminCtrl,
    getAdminProfileCtrl = _require.getAdminProfileCtrl;

var isAdmin = require("../../middlewares/isAdmin");

var isLogin = require("../../middlewares/isLogin");

var adminRouter = express.Router(); //admin register

adminRouter.post("/register", registerAdmnCtrl); //admin login

adminRouter.post("/login", loginAdminCtrl); //get all admins

adminRouter.get("/", isLogin, getAdminsCtrl); //single admin

adminRouter.get("/Profile", isLogin, isAdmin, getAdminProfileCtrl); //update admin

adminRouter.put("/", isLogin, isAdmin, updateAdminCtrl); //delete admin

adminRouter["delete"]("/:id", deleteAdminCtrl); //admin suspend teacher

adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl); //admin unsuspending teacher

adminRouter.put("/unsuspend/teacher/:id", adminUnSuspendTeacherCtrl); ////admin withdrawing teacher

adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacherCtrl); //admin Unwithdrawing teacher

adminRouter.put("/unwithdraw/teacher/:id", adminUnWithdrawTeacherCtrl); //admin publish exam results

adminRouter.put("/publish/exam/:id", adminPublishResultsCtrl); //admin Unpublish exam results

adminRouter.put("/unpublish/exam/:id", adminUnPublishResultsCtrl);
module.exports = adminRouter;
//# sourceMappingURL=adminRouter.dev.js.map