const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
// Importar rutas
const postRoutes = require('./routes/posts');

app.use('/posts', postRoutes);

// /Middlewares

// ROUTES
app.get('/', (req, res) => {
    res.send('We are on home!')
})

try {
    mongoose.connect( process.env.DB_CONECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
}catch (error) { 
    console.log("could not connect", error);
    }

// Para "escuchar" al servidor
app.listen(3000);