'use strict' // Usa el modo stricto en javaScript

const { Router } = require('express'); // Importa el enrutador de express
const router = Router();
const { uploadFile } = require('../lib/uploadUser'); // Importa la configuracion para subir un archivo a users
const userController = require('../controllers/user'); // Importa el controlador del usuario

router.post('/signup', uploadFile, userController.createUser);

module.exports = router;