const { searchModel } = require('../models/Search.model');
const dotenv = require('dotenv');
dotenv.config();

const STORAGE_LIMIT_DEFAULT = 3//300000;  //Kb

//const STORAGE_LIMIT = (isNaN(parseInt(process.env.STORAGE_LIMIT)))? STORAGE_LIMIT_DEFAULT : parseInt(process.env.STORAGE_LIMIT);
const STORAGE_LIMIT = (Number.isInteger(parseInt(process.env.STORAGE_LIMIT)))? parseInt(process.env.STORAGE_LIMIT) : STORAGE_LIMIT_DEFAULT;

const limit = async ()=>{
    if(STORAGE_LIMIT > 0){
        const results = await searchModel.collection.stats( { scale : 1024 } );
        return (results.size < STORAGE_LIMIT);
    } else {
        return true;
    }
}; 

module.exports = { limit };