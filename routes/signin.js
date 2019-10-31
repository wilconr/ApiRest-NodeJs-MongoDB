'use strict' // Usa el modo stricto en javaScript

const express = require('express');
const app = express();
const signInController = require('../controllers/signin'); // Importa el controlador del signin

app.post('/signin', signInController.signIn);

module.exports = app;