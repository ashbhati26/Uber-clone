const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define a schema for the user collection
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: { // Socket ID for real-time communication
    type: String,
  },
});

// Instance method to generate an authentication token
userSchema.methods.generateAuthToken = function () {
  // Generate a JSON Web Token containing the user's unique ID
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h", // Token expiration time
  });
  return token;
};

// Instance method to compare a plain text password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Return true if passwords match
};

// Static method to hash a password before saving it to the database
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
};

// Create a Mongoose model for the user collection using the defined schema
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
