const { Router } = require('express');
const { categories } = require('../controllers/categories.controllers');

const router = Router();

router.get('/categories', categories );

module.exports = router;