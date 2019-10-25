'use strict' // Usa el modo stricto en javaScript

const express = require('express'); // Importa el paquete express
const bodyParser = require('body-parser'); // Importa el paquete body-parser
const app = express(); // Ejecuta el servidor express

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

app.use(bodyParser.json()); // parse application/json

app.use(require('./routes/index')); // Configuración global de rutas

module.exports = app;