// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate,login,registerAuthor } = require('../middleware/authvalidationMiddleware');
const { validateAuthorInput } = require('../middleware/authvalidationMiddleware');
const { checkExistingUser } = require('../middleware/authvalidationMiddleware'); // Import the new middleware

// Placeholder array to simulate registered authors

// Array to store blacklisted tokens
let blacklist = [];
// Secret key for JWT

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Call the login function from the authMiddleware
    const loginResult = login(username, password);
  
    if (loginResult.success) {
      // Return success message and token
      res.json({ message: "Login successful", token: loginResult.token });
    } else {
      // Return error message
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

// Logout endpoint
router.post('/logout', authenticate, (req, res) => {
  // Add the token to the blacklist
  blacklist.push(req.token);
  // Here, you can simply respond with a success message
  res.json({ message: "Logout successful" });
});

// Register endpoint
router.post('/register', validateAuthorInput, checkExistingUser, registerAuthor);

module.exports = router;
