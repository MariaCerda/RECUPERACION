// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const docenteRoutes = require('./routes/docenteRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

mongoose.connect('mongodb://localhost/tu_basededatos', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());

app.use('/docentes', docenteRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});