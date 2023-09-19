// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Verificar si el usuario tiene un token válido
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, 'secreto', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
};

// Middleware para verificar roles de usuario
exports.verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role || req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }
  };
};