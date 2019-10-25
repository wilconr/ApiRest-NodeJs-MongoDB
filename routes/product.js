'use strict' // Usa el modo stricto en javaScript

const express = require('express');
const app = express();
const productController = require('../controllers/product'); // Importa el controlador del producto

app.get('/products', productController.getProducts);

app.get('/product/:productId', productController.getProduct);

app.post('/product', productController.createProduct);

app.put('/product/:productId', productController.updateProduct);

app.delete('/product/:productId', productController.deleteProduct);

module.exports = app;