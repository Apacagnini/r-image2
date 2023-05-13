const { Router } = require('express')
const { searchBack } = require('../controllers/searchBack.controller');
const { search } = require('../controllers/search.controllers');

const router = Router()

router.get('/search', searchBack )
router.get('/search', search )

module.exports = router