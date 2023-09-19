// components/docente/controllers/docenteController.js
const bcrypt = require('bcrypt');
const Docente = require('../models/docente');
const { generateToken } = require('../../../config/auth');

// Registro de un docente (solo admin)
exports.registrarDocente = async (req, res) => {
  try {
    const { cedula, nombres, apellidos, usuario, clave, role } = req.body;

    if (!role || (role !== 'admin' && role !== 'docente')) {
      return res.status(400).json({ message: 'El campo "role" debe ser "admin" o "docente".' });
    }

    const hashedClave = await bcrypt.hash(clave, 10);
    const nuevoDocente = new Docente({ cedula, nombres, apellidos, usuario, clave: hashedClave, role });

    await nuevoDocente.save();
    res.status(201).json(nuevoDocente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Listar todos los docentes (admin y docente)
exports.listarDocentes = async (req, res) => {
  try {
    const docentes = await Docente.find({}, { clave: 0 }); // Excluir la clave
    res.status(200).json(docentes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};