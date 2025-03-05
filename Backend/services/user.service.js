// Import the user model to interact with the user collection in the database
const userModel = require("../models/user.model");

// Export a function to create a new user
module.exports.createUser = async ({
  firstname, // User's first name
  lastname, // User's last name
  email, // User's email address
  password, // User's password
}) => {
  // Check if the required fields are provided
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  // Create a new user document in the database
  const user = userModel.create({
    fullname: {
      firstname, // Set the firstname field under fullname
      lastname, // Set the lastname field under fullname
    },
    email, // Set the user's email
    password, // Set the user's password
  });

  return user;
};
