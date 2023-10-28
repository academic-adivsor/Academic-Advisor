require("dotenv").config(); // Load environment variables first

const mongoose = require('mongoose');
const http = require('http');
const dbConnect = require("./config/dbConnect");
const app = require("./app/app");
const port = process.env.PORT || 8000; // Use uppercase 'PORT' for environment variable

console.log("MONGO_URL:", process.env.MONGO_URL); // Debug statement to verify MONGO_URL

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const server = http.createServer(app);
server.listen(port, console.log(`Server is running on port ${port}`));