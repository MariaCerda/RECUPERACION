// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Docente = require('../models/Docente');

// Iniciar sesión y obtener un token JWT
exports.login = async (req, res) => {
  try {
    const { usuario, clave } = req.body;
    const docente = await Docente.findOne({ usuario });

    if (!docente || !(await bcrypt.compare(clave, docente.clave))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ usuario, role: docente.role }, 'secreto', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};