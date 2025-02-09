const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Route to create a new ride
router.post(
  "/create",
  authMiddleware.authUser,

  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),

  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),

  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),

  // Controller method to handle ride creation
  rideController.createRide
);

// Route to get the estimated fare for a ride
router.get(
  "/get-fare",
  authMiddleware.authUser,

  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),

  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),

  // Controller method to fetch the fare
  rideController.getFare
);

// Route to confirm a ride by the captain
router.post(
  "/confirm",
  authMiddleware.authCaptain,
  // Validates the 'rideId' field: must be a valid MongoDB ObjectId
  body("rideId").isMongoId().withMessage("Invalid ride id"),

  // Controller method to confirm the ride
  rideController.confirmRide
);

// Route to start a ride
router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  // Validates the 'rideId' query parameter: must be a valid MongoDB ObjectId
  query("rideId").isMongoId().withMessage("Invalid ride id"),

  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),

  // Controller method to start the ride
  rideController.startRide
);

// Route to end a ride
router.post(
  "/end-ride",
  authMiddleware.authCaptain,
  // Validates the 'rideId' field: must be a valid MongoDB ObjectId
  body("rideId").isMongoId().withMessage("Invalid ride id"),

  // Controller method to end the ride
  rideController.endRide
);

module.exports = router;
