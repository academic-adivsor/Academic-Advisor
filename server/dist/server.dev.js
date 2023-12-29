"use strict";

require("dotenv").config();

var http = require("http");

require("./config/dbConnect");

var app = require("./app/app");

var cors = require('cors');

app.use(cors());
var corsOptions = {
  origin: ['http://localhost:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 204
};
var PORT = process.env.PORT || 2020; //server // Huseein 

var server = http.createServer(app);
server.listen(PORT, console.log("Server is running on port ".concat(PORT)));
//# sourceMappingURL=server.dev.js.map
