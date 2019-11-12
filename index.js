'use strict' // Usa el modo stricto en javaScript
require('dotenv').config();
const { appConfig, dbConfig } = require('./api/config/config');

const app = require('./api/app');
const mongoose = require('mongoose');
const port = appConfig.port;
const db = dbConfig.urlDB;


// Conexion a la base de datos
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }, (err, resp) => {

    if (err) {
        return console.log(`Error al conectarse a la base de datos: ${err}`);
    }
    console.log('Base de datos ONLINE');

    // Ejecuta el servicio api
    app.listen(port, () => {
        console.log(`Api Rest Corriendo en http://localhost:${port}`);
    });

});