// index.js
const app = require("./src/app");
const { connectDB } = require("./src/config/database");

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("✅ Database connected successfully");

    app.listen(port, () => {
      console.log(`************* Server running at port ${port} *************`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
