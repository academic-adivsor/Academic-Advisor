const AysncHandler = require("express-async-handler");
const Student = require("../../model/academic/Student");
const { hashPassword } = require("../../utlis/helpers");
//@desc  Admin Register Teacher
//@route POST /api/students/admin/register
//@acess  Private Admin only

exports.adminRegisterStudent = AysncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    //check if teacher already exists
    const student = await Student.findOne({ email });
    if (student) {
      throw new Error("Student already employed");
    }
    //Hash password
    const hashedPassword = await hashPassword(password);
    // create
    const studentRegistered = await Student.create({
      name,
      email,
      password: hashedPassword,
    });
    //send student data
    res.status(201).json({
      status: "success",
      message: "Student registered successfully",
      data: studentRegistered,
    });
  });