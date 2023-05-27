const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3001;

//START APP
require('./utils/mongoose');
app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});