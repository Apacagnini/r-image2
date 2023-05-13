const { categoriesList } = require('../constants/categoriesList');

const categories = async (req, res, next) => {
    res.send({ categoriesList })
}

module.exports = { categories }