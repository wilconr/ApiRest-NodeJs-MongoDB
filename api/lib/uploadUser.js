'use strict' // Usa el modo stricto en javaScript

const path = require('path');
const multer = require('multer'); // Importa el paquete multer



// Configuraciones Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, `../../public/uploads/users`),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

let uploadFile = multer({ storage }).single('image');

module.exports = {
    uploadFile
};