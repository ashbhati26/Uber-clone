const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

// Get coordinates for an address
module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: error.message || "Coordinates not found" });
  }
};

// Get distance and time between two locations
module.exports.getDistanceTime = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("pickup and destination are required");
  }

  // Format the pickup and destination as "lat,lng"
  const formattedpickup = `${pickup.lat},${pickup.lng}`;
  const formattedDestination = `${destination.lat},${destination.lng}`;
  const url = `${OSRM_URL}/route/v1/driving/${formattedpickup};${formattedDestination}?overview=false`;

  try {
    const response = await axios.get(url);
    if (response.data.routes.length === 0) {
      throw new Error("No routes found");
    }

    const route = response.data.routes[0];
    return {
      distance: route.distance, // Distance in meters
      duration: route.duration, // Duration in seconds
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};


// Get autocomplete suggestions for a location
module.exports.getAutoCompleteSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { input } = req.query;

  try {
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (err) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};
