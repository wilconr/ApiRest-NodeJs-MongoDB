'use strict' // Usa el modo stricto en javaScript

const Product = require('../models/product'); // Importar el modelo producto

let getProducts = (req, res) => {

    Product.find({}, (err, products) => {

        if (err) {
            return res.status(500).json({
                message: `Error al realizar la peticion. ${err}`
            });
        }

        if (!products) {
            return res.status(404).json({
                message: 'No existen productos'
            });
        }

        res.status(200).json({
            message: 'Productos encontrados en la base de datos',
            products
        });

    });

}

let getProduct = (req, res) => {

    let productId = req.params.productId;

    Product.findById(productId, (err, product) => {

        if (err) {
            return res.status(500).json({
                message: `Error al realizar la peticion. ${err}`
            });
        }

        if (!product) {
            return res.status(404).json({
                message: `El producto con id: ${productId} no existe`
            });
        }

        res.status(200).json({
            message: 'Producto encontrado en la base de datos',
            product
        });

    });

}

let createProduct = (req, res) => {

    let body = req.body;

    console.log('POST /product');
    console.log(body);

    let product = new Product({

        name: body.name,
        picture: body.picture,
        price: body.price,
        category: body.category,
        description: body.description

    })

    product.save((err, productStored) => {

        if (err) {
            return res.status(500).json({
                message: `Error al guardar en la base de datos ${err}`
            });
        }

        res.status(201).json({
            message: 'Producto guardado en la base de datos',
            product: productStored
        });

    });

}

let updateProduct = (req, res) => {

    let productId = req.params.productId;
    let body = req.body;

    Product.findByIdAndUpdate(productId, body, { new: true }, (err, productUpdated) => {

        if (err) {
            return res.status(500).json({
                message: `Error al realizar la peticion. ${err}`
            });
        }

        if (!productUpdated) {
            return res.status(404).json({
                message: `El producto con id: ${productId} no existe`
            });
        }

        res.status(200).json({
            message: 'Producto actualizado la base de datos',
            productUpdated
        });

    });

}

let deleteProduct = (req, res) => {

    let productId = req.params.productId;

    Product.findByIdAndRemove(productId, (err, product) => {

        if (err) {
            return res.status(500).json({
                message: `Error al realizar la peticion. ${err}`
            });
        }

        if (!product) {
            return res.status(404).json({
                message: `El producto con id: ${productId} no existe`
            });
        }

        res.status(200).json({
            message: 'Producto eliminado la base de datos'
        });

    });

}
module.exports = {

    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,

};