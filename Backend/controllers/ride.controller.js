const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

// Controller function for creating a new ride
module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the necessary data from the request body
  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    // Create the ride using the rideService
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride); // Send back the created ride as response

    // Get coordinates of the pickup location using mapService
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

    // Find captains within a 2 km radius of the pickup location
    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );

    ride.otp = ""; // Clear OTP before sending ride data to captains

    // Fetch the ride with user details populated
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    // Notify all captains within radius about the new ride
    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// Controller function to get the fare of a ride
module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure pickup and destination from query parameters
  const { pickup, destination } = req.query;

  try {
    // Get the fare from rideService
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare); // Send fare as response
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Controller function to confirm the ride
module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure rideId from request body
  const { rideId } = req.body;

  try {
    // Confirm the ride using rideService
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    // Notify the user that their ride is confirmed
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride); // Send ride details as response
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// Controller function to start the ride
module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure rideId and OTP from query parameters
  const { rideId, otp } = req.query;

  try {
    // Start the ride using rideService
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    // Notify the user that their ride has started
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride); // Send ride details as response
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Controller function to end the ride
module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure rideId from request body
  const { rideId } = req.body;

  try {
    // End the ride using rideService
    const ride = await rideService.endRide({ rideId, captain: req.captain });

    // Notify the user that their ride has ended
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json(ride); // Send ride details as response
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
