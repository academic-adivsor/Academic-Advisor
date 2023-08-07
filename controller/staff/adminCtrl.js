const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/staff/Admin");
const generateToken = require("../../utlis/generateToken");
const verifyToken = require("../../utlis/verifyToken");
//desc register admin
//router POST /api/admin/register
//@aces Private
exports.registerAdmnCtrl = AsyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    //check if email exists
    const adminFound = await Admin.findOne({ email });
    if (adminFound) {
        throw new Error("Admin Exists");
    }
    const user = await Admin.create({
        name,
        email,
        password,
    });
    res.status(201).json({
        status: "success",
        data: user,
    });
});
//@desc login admin
//@route POST /api/v1/admins/login
//@access Private
exports.loginAdminCtrl = AsyncHandler(async(req, res) => {
    const { email, password } = req.body;
    //find user
    const user = await Admin.findOne({ email });
    if (!user) {
        return res.json({ message: "Invalid login crendentials" });
    }
    if (user && (await user.verifyPassword(password))) {
        const token = generateToken(user._id);
        const verify = verifyToken(token);
        return res.json({ data: generateToken(user._id), user, verify });
    } else {
        return res.json({ message: "Invalid login crendentials" });
    }
});
//@desc Get all admin
//@route GET /api/v1/admins
//@access Private
exports.getAdminsCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "All admins",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};
//@desc Get single admin
//@route GET /api/v1/admins/:id
//@access Private
exports.getAdminCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "added single admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};
//@desc update admin
//@route UPDATE /api/v1/admins/:id
//@access Private
exports.updateAdminCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "update admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};
//@desc delete admin
//@route DELETE /api/v1/admins/:id
//@access Private
exports.deleteAdminCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "delete admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};
//@desc admin suspend a teacher
//@route PUT /api/v1/admins/suspend/teacher:id
//@access Private
exports.adminSuspendTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin suspend teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};
//@desc admin unsuspend a teacher
//@route PUT /api/v1/admins/unsuspend/teacher:id
//@access Private
exports.adminUnSuspendTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin unsuspend teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};
//@desc admin withdraws a teacher
//@route PUT /api/v1/admins/withdraws/teacher:id
//@access Private
exports.adminWithdrawTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin withdraw teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};
//@desc admin unwithdraws a teacher
//@route PUT /api/v1/admins/unwithdraws/teacher:id
//@access Private
exports.adminUnWithdrawTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin unwithdraw teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};
//@desc admin publish exam results
//@route PUT /api/v1/admins/publish/exam:id
//@access Private
exports.adminPublishResultsCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin publish exam results",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};
//@desc admin unpublish exam results
//@route PUT /api/v1/admins/unpublish/exam:id
//@access Private
exports.adminUnPublishResultsCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin unpublish exam results",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};