const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

module.exports = app;

// https://youtu.be/NmkY4JgS21A?si=H-L2IV-a9eel1bL2&t=921