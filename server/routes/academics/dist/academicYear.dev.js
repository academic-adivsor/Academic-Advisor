"use strict";

var express = require("express");

var _require = require("../../controller/academics/academicYearCtrl"),
    createAcademicYear = _require.createAcademicYear,
    getAcademicYears = _require.getAcademicYears,
    getAcademicYear = _require.getAcademicYear,
    updateAcademicYear = _require.updateAcademicYear,
    deleteAcademicYear = _require.deleteAcademicYear;

var isAdmin = require("../../middlewares/isAdmin");

var isLogin = require("../../middlewares/isLogin");

var academicYearRouter = express.Router(); // academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get("/", isLogin, isAdmin, getAcademicYears);

academicYearRouter.route("/").post(isLogin, isAdmin, createAcademicYear).get(isLogin, isAdmin, getAcademicYears);
academicYearRouter.route("/:id").get(isLogin, isAdmin, getAcademicYear).put(isLogin, isAdmin, updateAcademicYear)["delete"](isLogin, isAdmin, deleteAcademicYear); // academicYearRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicYearRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicYearRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = academicYearRouter;
//# sourceMappingURL=academicYear.dev.js.map
