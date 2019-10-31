// -------Puerto------------

process.env.PORT = process.env.PORT || 3000;

// -------Url base de datos----------------

process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shop';

// -------Vencimiento del Token------------

process.env.CADUCIDAD_TOKEN = '48h';

// -------SEED de autenticación------------

process.env.SEED = process.env.SEED || 'seed-de-desarrollo';