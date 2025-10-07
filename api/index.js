// api/index.js
const serverless = require("serverless-http");
const app = require("../src/app");
const { connectDB } = require("../src/config/database");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("Database connected");
  }
  const handler = serverless(app);
  return handler(req, res);
};
