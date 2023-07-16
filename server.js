const http = require('http');
const app = require("./app/app");
const port = process.env.PORT || 8000
const server = http.createServer(app);
app.listen(port, console.log(`server is running on port $(PORT)`));