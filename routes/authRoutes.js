// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Ruta para iniciar sesión y obtener un token JWT
router.post('/login', login);

module.exports = router;