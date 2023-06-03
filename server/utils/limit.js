const { searchModel } = require('../models/Search.model');
const dotenv = require('dotenv');
dotenv.config();
const STORAGE_LIMIT = (process.env.STORAGE_LIMIT)? parseInt(process.env.STORAGE_LIMIT) : 300000;

const limit = async ()=>{
    results = await searchModel.collection.stats( { scale : 1024 } )
    return results.size < STORAGE_LIMIT
}; 

module.exports = { limit };