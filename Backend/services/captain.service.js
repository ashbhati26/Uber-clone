const captainModel = require("../models/captain.model");

// Exporting the createCaptain function, which handles the creation of a new captain
module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  // Validate that all required fields are provided
  if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error("All fields are required");
  }

  // Create a new captain entry in the database
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname, 
    },
    email,   
    password,

    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  // Return the newly created captain object
  return captain;
};
