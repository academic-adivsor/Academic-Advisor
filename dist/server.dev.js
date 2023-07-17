"use strict";

var http = requir('http');

var app = require("./app/app");

var port = process.env.port || 8080;
var server = http.createserver(app);
server.listen(port, console.log("server is running on port $(PORT)"));
//# sourceMappingURL=server.dev.js.map
