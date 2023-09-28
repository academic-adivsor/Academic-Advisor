require("dotenv").config();
const http = require('http');
require("./config/dbConnect");
const app = require("./app/app");
const port = process.env.port || 8800;
const server = http.createServer(app);
server.listen(port, console.log(`server is running on port $(PORT)`));
//gg