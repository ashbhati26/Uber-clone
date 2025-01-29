const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the schema for the "captain" collection in MongoDB
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Lastname must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  // Vehicle information object
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  // Location object containing latitude and longitude
  location: {
    ltd: {
      type: Number, // Latitude value as a number
    },
    lng: {
      type: Number, // Longitude value as a number
    },
  },
});

// Instance method to generate a JWT for a specific captain
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id }, // Payload contains the captain's unique ID
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

// Instance method to compare a plain-text password with the hashed password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // bcrypt compares the passwords and returns a boolean
};

// Static method to hash a plain-text password before saving to the database
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10); // Hashes the password with a salt of 10 rounds
};

// Create a Mongoose model from the schema
const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
