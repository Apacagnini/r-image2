const { connect } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// connection to db
(async () => {
  if (![undefined, 'DISABLED'].includes(process.env.MONGODB_URI)) {
    try {
      const db = await connect(process.env.MONGODB_URI);
      console.log("Db connectect to", db.connection.name);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('Database not available')
  }
})();

