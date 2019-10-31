'use strict' // Usa el modo stricto en javaScript

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

const userSchema = new Schema({

    avatar: {
        type: String,
        required: false
    },
    displayName: {
        type: String,
        required: [true, 'El campo nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'El campo correo electronico es requerido']
    },
    password: {
        type: String,
        required: [true, 'El campo contraseña es requerido']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    state: {
        type: Boolean,
        default: true
    },
    singUpDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date
    }

});

// Quitar la clave password del schema en mongodb
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' }); // {PATH} es la referencia a el campo email


module.exports = mongoose.model('User', userSchema);