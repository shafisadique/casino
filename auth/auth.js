// auth.js (or any authentication-related file)
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const secretKey = process.env.SECRET_KEY; // Load the secret key from environment variables

// Function to generate a JWT token
function generateToken(userId) {
  const payload = { user_id: userId };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}

// Export the function to use it in your login or registration routes
module.exports = { generateToken };
