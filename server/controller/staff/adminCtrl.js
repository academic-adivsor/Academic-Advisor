const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../../model/staff/Admin");
const generateToken = require("../../utlis/generateToken");
const verifyToken = require("../../utlis/verifyToken");
const {hashPassword, isPassMatched}=require("../../utlis/helpers");
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
    
    //register
    const user = await Admin.create({
        name,
        email,
        password: await hashPassword(password),
    });
    res.status(201).json({
        status: "success",
        data: user,
        message: "Admin registered successfully",
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
    const isMatched = await isPassMatched(password, user.password);
    if (!isMatched){
        return res.json({ message: "Invalid login crendentials" });
    } else {
        return res.json({
            data: generateToken(user._id),
            message: "Admin Logged in successfully",
        });
    }
});
//@desc Get all admin
//@route GET /api/v1/admins
//@access Private
exports.getAdminsCtrl = AsyncHandler(async(req, res) => {
    res.status(200).json(res.results);
});
//@desc Get single admin
//@route GET /api/v1/admins/:id
//@access Private
exports.getAdminProfileCtrl = AsyncHandler(async(req, res) => {
    const admin = await Admin.findById(req.userAuth._id).select("-password -createdAt -updatedAt").populate("academicYears");
    if (!admin) {
        throw new Error("Admin not found");
    } else {
        res.status(200).json({
            status: "success",
            data: admin,
            message: "Admin Profile Fetched successfully",
        });
    }
});
//@desc update admin
//@route UPDATE /api/v1/admins/:id
//@access Private
exports.updateAdminCtrl = AsyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    //if email is taken
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      throw new Error("This email is taken/exist");
    }
  
    //hash password
    //check if user is updating password
  
    if (password) {
      //update
      const admin = await Admin.findByIdAndUpdate(
        req.userAuth._id,
        {
          email,
          password: await hashPassword(password),
          name,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: admin,
        message: "Admin updated successfully",
      });
    } else {
      //update
      const admin = await Admin.findByIdAndUpdate(
        req.userAuth._id,
        {
          email,
          name,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: admin,
        message: "Admin updated successfully",
      });
    }
  });
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