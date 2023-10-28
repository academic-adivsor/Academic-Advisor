"use strict";

require("dotenv").config(); // Load environment variables first


var mongoose = require('mongoose');

var http = require('http');

var dbConnect = require("./config/dbConnect");

var app = require("./app/app");

var port = process.env.PORT || 8000; // Use uppercase 'PORT' for environment variable

console.log("MONGO_URL:", process.env.MONGO_URL); // Debug statement to verify MONGO_URL

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var server = http.createServer(app);
server.listen(port, console.log("Server is running on port ".concat(port)));
//# sourceMappingURL=server.dev.js.map
