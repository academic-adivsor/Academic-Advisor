const http = requir('http');
const app = require("./app/app");
const port = process.env.port || 8080;
const server = http.createserver(app);
server.listen(port, console.log(`server is running on port $(PORT)`));