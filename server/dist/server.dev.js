"use strict";

require("dotenv").config();

var http = require("http");

require("./config/dbConnect");

var app = require("./app/app");

var PORT = process.env.PORT || 2020; //server

var server = http.createServer(app);
server.listen(PORT, console.log("Server is running on port ".concat(PORT)));
//# sourceMappingURL=server.dev.js.map
