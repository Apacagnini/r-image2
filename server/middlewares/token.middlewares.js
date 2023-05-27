const dotenv = require('dotenv');
dotenv.config();

const token = (req, res, next) => {
    if (process.env.API_TOKEN === req.headers.apitoken || process.env.API_TOKEN === undefined){
        next()
    }else{
        console.log(`403: fail to verify token`)
        res.sendStatus(403) //Forbidden
    }
}

module.exports = token