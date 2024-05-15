//Imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();

//Routes
const authRoute = require("./backend/routes/AuthRoutes");
const taskRoute = require("./backend/routes/TaskRoutes");
const profileRoute = require("./backend/routes/ProfileRoutes");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("*********MongoDB Connected!***********");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware for authentication
const authMiddleware = (req, res, next) => {
  // Your authentication logic here
  // For now, let's just call next() to skip authentication
  next();
};

// Apply authentication middleware only to the protected routes
app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute); // No authentication middleware applied here
app.use("/api/profile", profileRoute); // No authentication middleware applied here

// Homepage route without authentication
app.get("/", (req, res) => {
  // Your homepage logic here
  res.send("Welcome to the homepage");
});

// Serve frontend static files
if (process.env.NODE_ENV === "test") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
  );
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
