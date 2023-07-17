const http = require('http');
const app = require("./app/app");
const port = process.env.port || 8800;
const server = http.createServer(app);
server.listen(port, console.log(`server is running on port $(PORT)`));