"use strict";

var http = require('http');

var app = require("./app/app");

var port = process.env.PORT || 8000;
var server = http.createServer(app);
app.listen(port, console.log("server is running on port $(PORT)"));
//# sourceMappingURL=server.dev.js.map
