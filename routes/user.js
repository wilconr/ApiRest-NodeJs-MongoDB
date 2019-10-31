'use strict' // Usa el modo stricto en javaScript

const express = require('express');
const app = express();
const userController = require('../controllers/user'); // Importa el controlador del usuario

const { verificaToken, verificaAdminRole } = require('../middlewares/auth'); // Importar el middleware de autorizacion auth

// app.get('/users', userController.getUsers);

// app.get('/user/:userId', userController.getUser);

app.post('/user', [verificaToken, verificaAdminRole], userController.createUser);

// app.put('/user/:userId', userController.updateUser);

// app.delete('/user/:userId', userController.deleteUser);

module.exports = app;