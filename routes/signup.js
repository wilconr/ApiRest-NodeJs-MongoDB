'use strict' // Usa el modo stricto en javaScript

const express = require('express');
const app = express();
const signUpController = require('../controllers/signup.js'); // Importa el controlador del login

app.post('/signup', signUpController.signUp);

module.exports = app;