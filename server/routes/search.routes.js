const { Router } = require('express')
const { searchBack } = require('../controllers/searchBack.controller');
const dotenv = require('dotenv');
dotenv.config();

const { search } = process.env.SEARCH === 'AtlasFree'? require('../controllers/searchAtlasFree.controllers') : require('../controllers/search.controllers');

const router = Router()

router.get('/search', searchBack )
router.get('/search', search )

module.exports = router