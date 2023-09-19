// components/docente/routes/docenteRoutes.js
const express = require('express');
const router = express.Router();
const { registrarDocente, listarDocentes } = require('../controllers/docenteController');
const { verifyToken, verifyRole } = require('../../../config/auth');

// Ruta para registrar un docente (solo admin)
router.post('/', verifyToken, verifyRole('admin'), registrarDocente);

// Ruta para listar docentes (admin y docente)
router.get('/', verifyToken, listarDocentes);

module.exports = router;