const mongoose = require("mongoose");

// Define a schema for blacklisted tokens
const blacklistTokenSchema = new mongoose.Schema({
  // The JWT token to be blacklisted
  token: {
    type: String,
    required: true,
    unique: true,
  },
  // Timestamp for when the token was added to the blacklist
  createdAt: {
    type: Date, // The date the token was blacklisted
    default: Date.now, // Default value is the current timestamp
    expires: 86400, // token will be removed after 24 hours (86400 seconds)
  },
});

module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);
