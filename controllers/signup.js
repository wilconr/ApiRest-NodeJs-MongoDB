'use strict' // Usa el modo stricto en javaScript

const express = require('express');
const app = express();
const signUpController = require('../controllers/user'); // Importa el controlador del usuario

let signUp = app.post('/signup', signUpController.createUser);

module.exports = {
    signUp
};