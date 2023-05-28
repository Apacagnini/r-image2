const mongoose = require('mongoose');
const { defaultSearch } = require('../constants/defaultSearch');
const { fetchPexels } = require('../utils/fetchPexels');

const searchBack = async (req, res, next) => {
    if ( mongoose.connection.readyState === 1 ){
        next();
    } else {
        console.log('Database not available\nFetch from external api...')
        let { seed, page, query, per_page } = Object.assign({}, defaultSearch, req.query);
        let photos = [];
    
        let json = await fetchPexels(page, per_page, query);
        photos = json.photos;
    
        if (photos == undefined || photos.length == 0) {
            res.sendStatus(500); //500 Internal Server Error
        } else {
            let myHost = req.secure ? 'https' : 'http' + '://' + req.headers.host;
            let next_page = `${myHost}/search?page=${page + 1}&per_page=${per_page}&query=${query.replaceAll(' ', '+')}&seed=${seed}`;
            console.log('next_page: ', next_page);
            res.send({ page, per_page, photos, next_page });
        }
    }
}

module.exports = { searchBack };