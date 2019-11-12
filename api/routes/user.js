'use strict' // Usa el modo stricto en javaScript

const { Router } = require('express'); // Importa el enrutador de express
const router = Router();
const userController = require('../controllers/user'); // Importa el controlador del usuario
const { uploadFile } = require('../lib/uploadUser'); // Importa la configuracion para subir un archivo a users
const { verificaToken, verificaAdminRole } = require('../middlewares/auth'); // Importar el middleware de autorizacion auth

// router.get('/users', userController.getUsers);

// router.get('/user/:userId', userController.getUser);

router.post('/user', [verificaToken, verificaAdminRole], uploadFile, userController.createUser);

// router.put('/user/:userId', userController.updateUser);

router.delete('/user/:userId', userController.deleteUser);

module.exports = router;