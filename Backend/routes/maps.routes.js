const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const mapController = require("../controllers/map.controller");
const { query } = require("express-validator");

// Route to get coordinates for a given address
router.get(
  "/get-coordinates",
  // Validates that the 'address' query parameter is a string with a minimum length of 3
  query("address").isString().isLength({ min: 3 }),
  authMiddleware.authUser, // Middleware to ensure the user is authenticated
  mapController.getCoordinates // Handle the request and fetch coordinates
);

// Route to get distance and time between an pickup and destination
router.get(
  "/get-distance-time",
  // Validates that the 'pickup' query parameter is a string with a minimum length of 3
  query("pickup").isString().isLength({ min: 3 }),
  // Validates that the 'destination' query parameter is a string with a minimum length of 3
  query("destination").isString().isLength({ min: 3 }),
  authMiddleware.authUser, // Middleware to ensure the user is authenticated
  mapController.getDistanceTime // Handle the request and fetch distance and time
);

// Route to get autocomplete suggestions for a given input
router.get(
  "/get-suggestions",
  // Validates that the 'input' query parameter is a string with a minimum length of 3
  query("input").isString().isLength({ min: 3 }),
  authMiddleware.authUser, // Middleware to ensure the user is authenticated
  mapController.getAutoCompleteSuggestions // Handle the request and fetch suggestions
);

module.exports = router;
