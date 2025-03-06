const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const { rmSync } = require("fs");
const auth = require("./middleware/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
require("dotenv").config(); // Add this at the top of your server.js

const app = express();

// Enable CORS for specific origins (e.g., your frontend app)
app.use(
  cors({
    origin: "http://localhost:5000", // Change this to the correct frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Connect to the database
connectDB();

//init middeleware
app.use(express.json());

const jwtSecret = process.env.JWT_SECRET;
const dbURI = process.env.DB_URI;
const port = process.env.PORT || 5000;

// Add a route to handle the root (/) URL
app.get("/", (req, res) => {
  res.send("Welcome to the DevConnector API!");
});

/*app.post("/test", (req, res) => {
  console.log("Received data:", req.body);
  res.json({ message: "Data received" });
})*/

// Define other API routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;
rmSync;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
