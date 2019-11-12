'use strict' // Usa el modo stricto en javaScript

const fs = require('fs-extra'); // Importa el paquete FileSystem-Extra
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

let createProduct = async(req, res) => {

    // console.log(req.body);
    // console.log(req.file);

    let errors = [];
    let file = req.file;

    // Verificacion si no se sube un archivo
    if (!file) {
        errors.push({ texto: 'No se ha seleccionado un archivo' });
    }

    if (errors.length > 0) {
        let products = await Product.find();
        return res.status(400).json({ errors, products });
    }

    let fileName = req.file.originalname;
    let fileRoute = req.file.path;


    let splitName = fileName.split('.'); // Descomposicion del nombre del archivo para tomar la extension
    let extension = splitName[splitName.length - 1]; // expension de la imagen

    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']; // Extensiones validas

    // Verificacion si es un archivo de imagen valido
    if (extensionesValidas.indexOf(extension) < 0) {
        fs.unlink(fileRoute); // Elimina el archivo de la carpeta uploads
        errors.push({ texto: 'las extenciones permitidas son: ' + extensionesValidas.join(', ') });
    }

    if (errors.length > 0) {
        let products = await Product.find();
        return res.status(400).json({ errors, products });
    }

    const { name, price, category, description, type } = req.body;

    let product = new Product({

        name,
        image: fileRoute,
        price,
        category,
        description

    });


    // console.log(product);

    await product.save((err, productSaved) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            product: productSaved
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