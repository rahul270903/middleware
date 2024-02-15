// middleware/authValidationMiddleware.js
const jwt = require('jsonwebtoken');

// Secret key for JWT
const secretKey = 'your_secret_key';

// Array to store blacklisted tokens
let blacklist = [];

// Array to store registered authors
let registeredAuthors = [];

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  if (blacklist.includes(token)) {
    return res.status(401).json({ message: 'Token revoked' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded.user;
    next();
  });
};

// Function to handle login logic
const login = (username, password) => {
  const user = registeredAuthors.find(author => author.username === username && author.password === password);
  
  if (user) {
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
    return { success: true, token: token };
  } else {
    return { success: false };
  }
};

// Middleware to check if username is already taken
const checkExistingUser = (req, res, next) => {
  const { username } = req.body;

  const existingUser = registeredAuthors.find(author => author.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  next();
};

// Middleware to validate author input
const validateAuthorInput = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (typeof username !== "string") {
    return res.status(400).json({ message: "Username must be a string" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  next();
};


// Register new author
const registerAuthor = (req, res, next) => {
  const { username, password } = req.body;

  registeredAuthors.push({ username, password });
  res.status(201).json({ message: "Registration successful" });
};

module.exports = { 
  authenticate, 
  login, 
  checkExistingUser, 
  validateAuthorInput, 
  registerAuthor 
};
