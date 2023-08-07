"use strict";

var isLogin = function isLogin(req, res, next) {
  var isLogin = req.userAuth;
  console.log(req.userAuth);

  if (isLogin) {
    next();
  } else {
    var err = new Error("u re not login");
    next(err);
  }
};

module.exports = isLogin;
//# sourceMappingURL=isLogin.dev.js.map
