const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const axios = require("axios");

// Function to calculate the fare based on pickup and destination locations
module.exports.getFare = async ({ pickup, destination }) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  // Geocode the pickup and destination addresses
  const pickupCoords = await geocodeAddress(pickup);
  const destinationCoords = await geocodeAddress(destination);

  // Now pass the geocoded coordinates to the getDistanceTime function
  const distanceTime = await mapService.getDistanceTime(pickupCoords, destinationCoords);

  // Base fare for different vehicle types
  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  // Rate per kilometer for different vehicle types
  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  // Rate per minute for different vehicle types
  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  // Calculate total fare for each vehicle type based on distance and duration
  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };

  return fare;
};


// Geocode function to convert address to lat/lng using Nominatim API (OpenStreetMap)
const geocodeAddress = async (address) => {
  const encodedAddress = encodeURIComponent(address); // Ensure the address is encoded
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`;

  try {
    const response = await axios.get(url);
    if (response.data.length === 0) {
      throw new Error("Address not found");
    }
    const { lat, lon } = response.data[0]; // Extract latitude and longitude
    return { lat: parseFloat(lat), lng: parseFloat(lon) }; // Return as floats
  } catch (error) {
    console.error("Geocoding error:", error.message);
    throw new Error("Unable to geocode the address");
  }
};


// Function to generate a random OTP of a given length
function getOtp(num) {
  function generateOtp(num) {
    // Generate a random integer of the specified length
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

// Function to create a ride
module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  // Calculate fare for the given vehicle type
  const fare = await getFare(pickup, destination);

  // Create a new ride in the database
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType], // Use fare specific to the vehicle type
  });

  return ride;
};

// Function to confirm a ride and assign a captain
module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  // Update the ride status to 'accepted' and assign the captain
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  // Retrieve the updated ride details
  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

// Function to start a ride using OTP verification
module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  // Find the ride and include user and captain details
  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  // Update ride status to 'ongoing'
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  return ride;
};

// Function to end a ride
module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  // Find the ride associated with the captain
  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  // Update ride status to 'completed'
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};
