const express = require("express");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const cors = require("cors"); // Add CORS
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
connectDB()
  .then(() => {
    // Routes
    app.use("/api/jobs", jobRoutes);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });
