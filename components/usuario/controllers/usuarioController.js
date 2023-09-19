// components/usuario/controllers/usuarioController.js
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { generateToken } = require('../../../config/auth');

// Iniciar sesión y obtener un token JWT
exports.login = async (req, res) => {
  try {
    const { usuario, clave } = req.body;
    const user = await Usuario.findOne({ usuario });

    if (!user || !(await bcrypt.compare(clave, user.clave))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



