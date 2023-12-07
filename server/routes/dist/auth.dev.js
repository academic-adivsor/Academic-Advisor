"use strict";

var express = require("express");

var router = express.Router(); // controllers

var _require = require("../controller/auth"),
    login = _require.login;

router.post("/", login);
module.exports = router;
//# sourceMappingURL=auth.dev.js.map
