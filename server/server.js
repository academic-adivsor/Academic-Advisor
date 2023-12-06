require("dotenv").config();
const http = require("http");
require("./config/dbConnect");
const app = require("./app/app");
const cors = require('cors');
app.use(cors());
const corsOptions = {
    origin: ['http://localhost:8080'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204,
};

const PORT = process.env.PORT || 2020;
//server
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
