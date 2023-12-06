const globalErrHandler = (err, req, res, next) => {
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : "Failed";
    const statuscode = err.statuscode ? err.statuscode : 500;
    res.status(statuscode).json({
        status,
        message,
        stack,
    });
};

// not found
const notFoundErr = (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on server`);
    err.statusCode = 404; // Set the status code to 404
    next(err);
};

module.exports = { globalErrHandler, notFoundErr };