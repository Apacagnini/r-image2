const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

//VARIABLES
const port = process.env.PORT || 3001;

//ARRANCA APLICACION
require('./utils/mongoose');
app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});