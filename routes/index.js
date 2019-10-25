'use strict' // Usa el modo stricto en javaScript

const express = require('express');
const app = express();

app.use(require('./product'));

module.exports = app;