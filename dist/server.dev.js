"use strict";

var http = require('http');

var app = require("./app/app");

var port = process.env.port || 8800;
var server = http.createServer(app);
server.listen(port, console.log("server is running on port $(PORT)"));
//# sourceMappingURL=server.dev.js.map
