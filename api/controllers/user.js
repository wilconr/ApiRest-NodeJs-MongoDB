'use strict' // Usa el modo stricto en javaScript

const fs = require('fs-extra'); // Importa el paquete FileSystem-Extra
const User = require('../models/user'); // Importa el modelo de usuario
const bcrypt = require('bcrypt'); // Importa el modulo para encriptar la contraseña


let createUser = async(req, res) => {

    // console.log(req.body);
    // console.log(req.file);

    let errors = [];
    let file = req.file;

    // Verificacion si no se sube un archivo
    if (!file) {
        errors.push({ texto: 'No se ha seleccionado un archivo' });
    }

    if (errors.length > 0) {
        let users = await User.find();
        return res.status(400).json({ errors, users });
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
        let users = await User.find();
        return res.status(400).json({ errors, users });

    }

    const { name, email, password, role } = req.body;

    let user = new User({

        image: fileRoute,
        name,
        email,
        password: bcrypt.hashSync(password, 10), // Encripto la clave
        role

    });

    // console.log(user);

    await user.save((err, userSaved) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userSaved
        });

    });

}

let deleteUser = (req, res) => {

    let id = req.params.userId;

    User.findByIdAndRemove(id, (err, userDeleted) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            user: userDeleted
        });

    });

}

module.exports = {

    createUser,
    // getUsers,
    // getUser,
    // updateUser,
    deleteUser

}