const express = require('express');
const router = express.Router();
const { body } = require("express-validator"); 
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Route to register a new user
router.post('/register', [
    // Validate email to ensure it is a valid email address
    body('email').isEmail().withMessage('Invalid Email'),
    // Validate the first name to ensure it is at least 3 characters long
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    // Validate password to ensure it is at least 6 characters long
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser // Call the registerUser method from the controller
);

// Route to login a user
router.post('/login', [
    // Validate email to ensure it is a valid email address
    body('email').isEmail().withMessage('Invalid Email'),
    // Validate password to ensure it is at least 6 characters long
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser // Call the loginUser method from the controller
);

// Route to get the user's profile
router.get('/profile', 
    authMiddleware.authUser, // Authentication middleware to ensure the user is logged in
    userController.getUserProfile // Call the getUserProfile method from the controller
);

// Route to logout a user
router.get('/logout', 
    authMiddleware.authUser, // Authentication middleware to ensure the user is logged in
    userController.logoutUser // Call the logoutUser method from the controller
);

module.exports = router;
