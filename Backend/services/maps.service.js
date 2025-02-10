const axios = require("axios");
const captainModel = require("../models/captain.model");

// Base URLs for OpenStreetMap services
const NOMINATIM_URL = "https://nominatim.openstreetmap.org";
const OSRM_URL = "http://router.project-osrm.org";

// Function to fetch geographic coordinates for a given address
module.exports.getAddressCoordinate = async (address) => {
  const url = `${NOMINATIM_URL}/search?q=${encodeURIComponent(
    address
  )}&format=json`;

  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "YourAppName" }, // Add a user agent to comply with OSM's policies
    });
    if (response.data.length === 0) {
      throw new Error("Unable to fetch coordinates");
    }

    const location = response.data[0]; // Extract the first result
    return {
      ltd: parseFloat(location.lat), // Latitude
      lng: parseFloat(location.lon), // Longitude
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to calculate the distance and travel time between two locations
module.exports.geocodeAddress = async (address) => {
  if (!address) {
    throw new Error("Address is required");
  }

  // Use a geocoding API (e.g., Nominatim or Google Geocoding API)
  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1&limit=1`;

  try {
    const response = await axios.get(url);

    if (response.data.length === 0) {
      throw new Error("Unable to geocode address");
    }

    // Assuming the first result is the most accurate
    const location = response.data[0];
    return {
      ltd: parseFloat(location.lat),
      lng: parseFloat(location.lon),
    };
  } catch (error) {
    console.error("Error geocoding address:", error);
    throw new Error("Error geocoding address");
  }
};


// Function to fetch autocomplete suggestions for a given input query
module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input is required");
  }

  const url = `${NOMINATIM_URL}/search?q=${encodeURIComponent(
    input
  )}&format=json&addressdetails=1&limit=5&countrycodes=IN&language=en`;

  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "UberClone" }, // Add a user agent to comply with OSM's policies
    });

    if (response.data.length === 0) {
      console.log('No suggestions returned:', response.data);
      throw new Error("Unable to fetch suggestions");
    }
    

    return response.data.map((item) => ({
      displayName: item.display_name,
      ltd: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Function to find captains within a specified radius
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // Radius is provided in kilometers, converting it to radians for geospatial queries
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, ltd], radius / 6371], // Converting radius to radians
      },
    },
  });

  return captains;
};
