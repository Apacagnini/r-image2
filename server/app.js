const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

//SERVER CREATION
const app = express();

//IMPORT MIDDLEWARES
const token = require('./middlewares/token.middlewares');

//IMPORT ROUTES
const search = require('./routes/search.routes');
const send = require('./routes/send.routes');
const categories = require('./routes/categories.routes');

//MIDDLEWARES
app.use(express.json())
if (process.env.CORS === '1'){
    const cors = require('cors');
    app.use(cors()) //solo en desarollo
}

app.use((req, res, next) => {
    console.log(`Route: ${req.url} Method: ${req.method}`)
    next()
})

app.use(token)

//ROUTES
app.use(search);
app.use(categories);
app.use(send);

//404
app.use((req, res) => {
    res.sendStatus(404)
})

//EXPORT
module.exports = app;
