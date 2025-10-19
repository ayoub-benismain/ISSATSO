const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // You can change to '1d', '30m', etc.
  });
};

module.exports = generateToken;
