'use strict' // Usa el modo stricto en javaScript

const { Router } = require('express'); // Importa el enrutador de express
const router = Router();
const signInController = require('../controllers/signin'); // Importa el controlador del signin

router.post('/signin', signInController.signIn);

module.exports = router;