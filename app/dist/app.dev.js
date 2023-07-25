"use strict";

var express = require("express");

var morgan = require("morgan");

var app = express();
app.use(morgan("dev")); //admin register

app.post("/api/v1/admins/register", function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "admin has been registered"
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message
    });
  }
}); //admin log in

app.post("/api/v1/admins/login", function (req, res) {
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
}); //get all admins

app.get("/api/v1/admins", function (req, res) {
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
}); //get single admin

app.get("/api/v1/admins/:id", function (req, res) {
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
}); //update admin

app.put("/api/v1/admins/:id", function (req, res) {
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
}); //delete admin

app["delete"]("/api/v1/admins/:id", function (req, res) {
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
}); //admin suspending teacher

app.put("/api/v1/admins/suspend/teacher/:id", function (req, res) {
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
}); //admin Unsuspending teacher

app.put("/api/v1/admins/unsuspend/teacher/:id", function (req, res) {
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
}); //admin withdrawing teacher

app.put("/api/v1/admins/withdraw/teacher/:id", function (req, res) {
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
}); //admin unwithdrawing teacher

app.put("/api/v1/admins/unwithdraw/teacher/:id", function (req, res) {
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
}); //admin publish exam results

app.put("/api/v1/admins/publish/exam/:id", function (req, res) {
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
}); //admin Unpublish exam results

app.put("/api/v1/admins/unpublish/exam/:id", function (req, res) {
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
});
module.exports = app;
//# sourceMappingURL=app.dev.js.map
