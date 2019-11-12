'use strict' // Usa el modo stricto en javaScript

const User = require('../models/user'); // Importa el modelo de usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let signIn = (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o Contraseña incorrectos'
                }
            });
        }

        // -----Creacion del token------

        let seed = process.env.SEED;
        let expire = process.env.CADUCIDAD_TOKEN;

        let token = jwt.sign({
            user: userDB
        }, seed, {
            expiresIn: expire
        });

        // -----Creacion del token------

        res.json({
            auth: true,
            user: userDB,
            token
        });

    });

}

module.exports = {
    signIn
};