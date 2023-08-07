const express = require("express");
const { registerAdmnCtrl, adminPublishResultsCtrl, adminSuspendTeacherCtrl, adminUnPublishResultsCtrl, adminUnSuspendTeacherCtrl, adminUnWithdrawTeacherCtrl, adminWithdrawTeacherCtrl, getAdminsCtrl, loginAdminCtrl, updateAdminCtrl, deleteAdminCtrl, getAdminCtrl } = require("../../controller/staff/adminCtrl");
const isLogin = require("../../middlewares/isLogin");
const adminRouter = express.Router();
//admin register
adminRouter.post("/register", registerAdmnCtrl);
//admin login
adminRouter.post("/login", loginAdminCtrl);
//get all admins
adminRouter.get("/", getAdminsCtrl);
//single admin
adminRouter.get("/:id", isLogin, getAdminCtrl);
//update admin
adminRouter.put("/:id", updateAdminCtrl);
//delete admin
adminRouter.delete("/:id", deleteAdminCtrl);
//admin suspend teacher
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);
//admin unsuspending teacher
adminRouter.put("/unsuspend/teacher/:id", adminUnSuspendTeacherCtrl);
////admin withdrawing teacher
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacherCtrl);
//admin Unwithdrawing teacher
adminRouter.put("/unwithdraw/teacher/:id", adminUnWithdrawTeacherCtrl);
//admin publish exam results
adminRouter.put("/publish/exam/:id", adminPublishResultsCtrl);
//admin Unpublish exam results
adminRouter.put("/unpublish/exam/:id", adminUnPublishResultsCtrl);
module.exports = adminRouter;