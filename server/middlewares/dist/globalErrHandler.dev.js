"use strict";

var globalErrHandler = function globalErrHandler(err, req, res, next) {
  var stack = err.stack;
  var message = err.message;
  var status = err.status ? err.status : "Failed";
  var statuscode = err.statuscode ? err.statuscode : 500;
  res.status(statuscode).json({
    status: status,
    message: message,
    stack: stack
  });
}; //not found


var notFoundErr = function notFoundErr(req, res, next) {
  var err = new Error("Can't find ".concat(req.originalUrl, " on server"));
  next(err);
};

module.exports = {
  globalErrHandler: globalErrHandler,
  notFoundErr: notFoundErr
};
//# sourceMappingURL=globalErrHandler.dev.js.map
