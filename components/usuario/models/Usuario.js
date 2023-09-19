// components/usuario/models/Usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuario: String,
  clave: String,
  role: String, // 'admin' o 'docente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);