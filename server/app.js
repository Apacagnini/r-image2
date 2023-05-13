const express = require('express');
const cors = require('cors');

//CREACION DEL SERVIDOR
const app = express();

//IMPORTACION RUTAS
const search = require('./routes/search.routes');
const send = require('./routes/send.routes');
const categories = require('./routes/categories.routes');

//MIDDLEWARES
app.use(express.json())
app.use(cors()) //solo en desarollo

app.use((req, res, next) => {
    console.log(`Route: ${req.url} Method: ${req.method}`)
    next()
})

//RUTAS
app.use(search);
app.use(categories);
app.use(send);

//EXPORTACION
module.exports = app;