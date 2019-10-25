'use strict' // Usa el modo stricto en javaScript

require('./config/config');

const mongoose = require('mongoose'); // Importa el paquete mongoose
const app = require('./app');
const port = process.env.PORT;
const db = process.env.MONGO_URI;


// Conexion a la base de datos
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err, resp) => {

    if (err) {
        return console.log(`Error al conectarse a la base de datos: ${err}`);
    }
    console.log('Base de datos ONLINE');

    // Ejecuta el servicio api
    app.listen(port, () => {
        console.log(`Api Rest Corriendo en http://localhost:${port}`);
    });

});