// config/auth.js
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(payload, 'secreto', { expiresIn: '1h' });

  return token;
}

module.exports = {
  generateToken,
};