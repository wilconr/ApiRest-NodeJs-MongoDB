'use strict' // Usa el modo stricto en javaScript

const User = require('../models/user'); // Importa el modelo de usuario
const bcrypt = require('bcrypt'); // Importa el modulo para encriptar la contraseña

let createUser = (req, res) => {

    let body = req.body;

    let user = new User({

        avatar: body.avatar,
        displayName: body.displayName,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), // Encripto la clave
        role: body.role

    });

    user.save((err, userStored) => {

        if (err) {
            return res.status(500).json({
                message: `Error al guardar en la base de datos ${err}`
            });
        }

        res.status(201).json({
            message: 'Usuario registrado en la base de datos',
            user: userStored
        });

    });

}

module.exports = {

    createUser
    // getUsers,
    // getUser,
    // updateUser,
    // deleteUser,

};