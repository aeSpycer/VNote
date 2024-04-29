const express = require('express');
const morgan = require('morgan');
const path = require('path');


const app = express();

// Middlewares

app.use(morgan('dev'));

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// Routes

app.get('/', (req, res) => {

    res.send('Ruta inicial');

});

app.get('/inicio', (req, res) => {

    res.send('Ruta principal');

});

app.listen(3000);

console.log(`server on port ${3000}`);