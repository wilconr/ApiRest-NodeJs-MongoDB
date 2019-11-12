'use strict' // Usa el modo stricto en javaScript

const { Router } = require('express');
const router = Router();

router.use(require('./signin'));
router.use(require('./signup'));
router.use(require('./user'));
router.use(require('./product'));

module.exports = router;