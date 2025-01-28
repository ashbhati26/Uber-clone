const mongoose = require("mongoose");

function connectToDb() {
  // Use the connect method from Mongoose to connect to the database
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
}

// Export the connectToDb function
module.exports = connectToDb;
