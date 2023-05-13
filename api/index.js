const app = require('./app');

//VARIABLES
const port = process.env.PORT || 3001;

//ARRANCA APLICACION
require('./utils/mongoose');
app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});