// models/Docente.js
const mongoose = require('mongoose');

const docenteSchema = new mongoose.Schema({
  cedula: String,
  nombres: String,
  apellidos: String,
  usuario: String,
  clave: String,
  role: String,
});

module.exports = mongoose.model('Docente', docenteSchema);