const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express(); 
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db"); 
const userRoutes = require("./routes/user.routes");  
const captainRoutes = require("./routes/captain.routes"); 
const mapsRoutes = require("./routes/maps.routes"); 
const rideRoutes = require("./routes/ride.routes"); 

connectToDb();

// Middleware configuration
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(cookieParser());  // Parse cookies from incoming requests

// Root endpoint to verify API is working
app.get("/", (req, res) => {
  res.send("API Working");
});

// Define routes for the application
app.use("/users", userRoutes);  // User routes
app.use("/captains", captainRoutes);  // Captain routes
app.use("/maps", mapsRoutes);  // Maps routes
app.use("/rides", rideRoutes);  // Ride routes

module.exports = app;
