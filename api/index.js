// api/index.js
const serverless = require("serverless-http");
const app = require("../src/app");
const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
  console.log("✅ Database connected");
};

module.exports = async (req, res) => {
  try {
    await connectDB(); // ensure DB is connected
    const handler = serverless(app);
    return handler(req, res); // handle request
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};
