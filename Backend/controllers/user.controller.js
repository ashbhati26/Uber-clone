const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/backlistToken.model");

// Register a new user
module.exports.registerUser = async (req, res, next) => {
  // Validate request inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body; // Destructure user input from the request body

  // Check if the user already exists in the database
  const isUserAlready = await userModel.findOne({ email });
  if (isUserAlready) {
    return res.status(400).json({ message: "User already exist" }); // Respond if user exists
  }

  // Hash the user's password for security
  const hashedPassword = await userModel.hashPassword(password);

  // Create a new user with the provided details
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  // Generate an authentication token for the user
  const token = user.generateAuthToken();

  // Respond with the token and user information
  res.status(201).json({ token, user });
};

// Login a user
module.exports.loginUser = async (req, res, next) => {
  // Validate request inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body; // Destructure user input from the request body

  // Find the user in the database by email and include the password field
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" }); // Respond if user not found
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" }); // Respond if passwords don't match
  }

  // Generate an authentication token for the user
  const token = user.generateAuthToken();

  // Set the token in a cookie
  res.cookie("token", token);

  // Respond with the token and user information
  res.status(200).json({ token, user });
};

// Get the authenticated user's profile
module.exports.getUserProfile = async (req, res, next) => {
  // Respond with the user information attached to the request
  res.status(200).json(req.user);
};

// Logout a user
module.exports.logoutUser = async (req, res, next) => {
  // Clear the authentication token from cookies
  res.clearCookie("token");

  // Retrieve the token from cookies or headers
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  // Blacklist the token to prevent reuse
  await blackListTokenModel.create({ token });

  // Respond with a success message
  res.status(200).json({ message: "Logged out" });
};
