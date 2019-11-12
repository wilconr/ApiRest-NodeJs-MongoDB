'use strict' // Usa el modo stricto en javaScript

const { Router } = require('express'); // Importa el enrutador de express
const router = Router();
const { uploadFile } = require('../lib/uploadProduct'); // Importa la configuracion para subir un archivo a products
const productController = require('../controllers/product'); // Importa el controlador del producto


router.get('/products', productController.getProducts);

router.get('/product/:productId', productController.getProduct);

router.post('/product', uploadFile, productController.createProduct);

router.put('/product/:productId', productController.updateProduct);

router.delete('/product/:productId', productController.deleteProduct);

module.exports = router;