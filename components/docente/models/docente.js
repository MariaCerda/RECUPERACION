// components/docente/models/Docente.js
const mongoose = require('mongoose');

const docenteSchema = new mongoose.Schema({
  cedula: String,
  nombres: String,
  apellidos: String,
  usuario: String,
  clave: String,
  role: String, // 'admin' o 'docente'
});

module.exports = mongoose.model('Docente', docenteSchema);