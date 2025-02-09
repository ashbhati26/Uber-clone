const captainController = require("../controllers/captain.controller");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

// Route to register a new captain
router.post("/register",[
    body("email").isEmail().withMessage("Invalid Email"),

    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),

    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),

    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),

    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid Vehicle Type"),
  ],
  captainController.registerCaptain
);

// Route to login a captain
router.post("/login",[
    body("email").isEmail().withMessage("Invalid Email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  captainController.loginCaptain
);

// Route to fetch the profile of the logged-in captain
router.get("/profile",
  authMiddleware.authCaptain, // Middleware to ensure the user is authenticated
  captainController.getCaptainProfile // Use getCaptainProfile method to fetch profile data
);

// Route to log out the currently logged-in captain
router.get("/logout",
  authMiddleware.authCaptain, // Middleware to ensure the user is authenticated
  captainController.logoutCaptain // Use logoutCaptain method to handle logout logic
);

module.exports = router;
