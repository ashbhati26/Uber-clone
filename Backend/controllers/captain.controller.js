const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blackListTokenModel = require("../models/backlistToken.model");
const { validationResult } = require("express-validator");

// Controller for registering a new captain
module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body; // Destructure required fields from the request body

  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  // Hash the captain's password for secure storage
  const hashedPassword = await captainModel.hashPassword(password);

  // Create a new captain using the service layer
  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  // Generate an authentication token for the captain
  const token = captain.generateAuthToken();

  // Respond with the generated token and newly created captain data
  res.status(201).json({ token, captain });
};

// Controller for logging in a captain
module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body; // Destructure email and password from the request body

  // Find the captain by email and include the password field
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate an authentication token for the captain
  const token = captain.generateAuthToken();

  // Set the token as a cookie in the response
  res.cookie("token", token);

  // Respond with the token and captain data
  res.status(200).json({ token, captain });
};

// Controller for getting the logged-in captain's profile
module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

// Controller for logging out a captain
module.exports.logoutCaptain = async (req, res, next) => {
  // Retrieve the token from cookies or the Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // Add the token to the blacklist to invalidate it
  await blackListTokenModel.create({ token });

  // Clear the authentication token cookie
  res.clearCookie("token");

  // Respond with a success message
  res.status(200).json({ message: "Logout successfully" });
};
