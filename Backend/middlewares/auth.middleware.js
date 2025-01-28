const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/backlistToken.model");
const captainModel = require("../models/captain.model");

// Middleware to authenticate a regular user
module.exports.authUser = async (req, res, next) => {
  // Extract the token from cookies or the Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // Check if the token exists in the blacklist
  const isBlacklisted = await blackListTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    // If token is blacklisted, respond with unauthorized status
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!token) {
    // If token is not provided, respond with unauthorized status
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database using the decoded user ID
    const user = await userModel.findById(decoded._id);

    // Attach the authenticated user's data to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    return next();
  } catch (err) {
    // Handle invalid or expired token errors
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Middleware to authenticate a captain
module.exports.authCaptain = async (req, res, next) => {
  // Extract the token from cookies or the Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    // If token is not provided, respond with unauthorized status
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the token exists in the blacklist (invalidated tokens)
  const isBlacklisted = await blackListTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    // If token is blacklisted, respond with unauthorized status
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the captain in the database using the decoded captain ID
    const captain = await captainModel.findById(decoded._id);

    // Attach the authenticated captain's data to the request object
    req.captain = captain;

    // Proceed to the next middleware or route handler
    return next();
  } catch (err) {
    // Log the error for debugging purposes
    console.log(err);

    // Handle invalid or expired token errors
    res.status(401).json({ message: "Unauthorized" });
  }
};
