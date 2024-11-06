const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const businessRoutes = require("./routes/businessRoutes");
const jobRoutes = require("./routes/jobRoutes");
const studentRoutes = require("./routes/studentRoutes");
const connectDB = require("./config/database");

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
connectDB(); // Connect to MongoDB

// Register routes
app.use("/api/businesses", businessRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/students", studentRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
