const { connect } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// connection to db
(async () => {
  if ( ![undefined,'DISABLED'].includes(process.env.MONGO_URL) ){
    try {
      const db = await connect(process.env.MONGO_URL);
      console.log("Db connectect to", db.connection.name);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('Database not available')
  }
})();

