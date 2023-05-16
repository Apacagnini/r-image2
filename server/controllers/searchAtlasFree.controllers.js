const { searchModel } = require('../models/Search.model');
const { defaultSearch } = require('../constants/defaultSearch');
const { categoriesList } = require('../constants/categoriesList');
const { fetchPexels } = require('../utils/fetchPexels');
const { createHash } = require('node:crypto');
const dotenv = require('dotenv');
dotenv.config();
//const FORCE_HTTPS_ON_NEXT_PAGE = process.env.FORCE_HTTPS_ON_NEXT_PAGE;
const FORCE_HTTPS_ON_NEXT_PAGE = '1'

async function savePhotos(json, category) {
    if ("photos" in json) {
        json.photos.forEach(async element => {
            try {
                const search_id = await searchModel.find({ id: element.id });
                if (search_id.length == 0) {
                    element['category'] = [category]
                    const task = new searchModel(element)
                    await task.save();
                } else if (!search_id[0].category.includes(category)) {
                    await searchModel.updateOne({ id: element.id }, { $push: { category } })
                }
            } catch (error) {
                //console.log(`Error en savePhotos:\n ${error}`);
            }
        })
    }
}

async function photosRandom(category, page, per_page, seed) {
    seed = Number(seed)
    let Skip = per_page * (page - 1)
    photos = await searchModel.find({ category })
    photos.forEach((photo, index) => Object.assign(photos[index], { hash : createHash('md5').update(String(photo.id+seed)).digest('hex') } ) );
    photos.sort(function (a, b) {
        if (a.hash < b.hash) return -1;
        if (a.hash > b.hash) return 1;
        return 0;
    });
    photos = photos.splice(Skip,per_page);
    return photos
}

const search = async (req, res, next) => {
    let { seed, page, query, per_page } = Object.assign({}, defaultSearch, req.query);
    let catLimitReached = false
    let photos = []
    let category = query.replaceAll(' ', '_').replaceAll('+', '_')
    seed = parseInt(seed)
    page = parseInt(page)
    per_page = parseInt(per_page)

    if (categoriesList.includes(query.replaceAll('_', ' ').replaceAll('+', ' '))) {
        let n = await searchModel.find({ category }).count();
        console.log('count: ', n, ' required: ', per_page * (page))

        if (n < per_page * page) {
            console.log('Fetch from external api...')
            let json = await fetchPexels(page, per_page * 2, query)
            await savePhotos(json, category)
            if ("photos" in json && json.photos.length == 0) {
                console.log('category photo limit reached: ', category)
                catLimitReached = true
                page = 1
            } else {
                n = await searchModel.find({ category }).count();
                console.log('new count: ', n, ' required: ', per_page * (page))
            }
        }

        if (n >= per_page * page || catLimitReached == true) {
            photos = await photosRandom(category, page, per_page, seed)
            console.log('Results from db... ', photos.length)
        } else {
            photos = json.photos
            console.log('Results from external api...')
        }
    } else {
        console.log('Categoria inexistente')
    }

    if (photos == undefined || photos.length == 0) {
        res.sendStatus(500) //500 Internal Server Error
    } else {
        console.log('req.secure: ',req.secure) // TEST
        let myHost = ( req.secure || FORCE_HTTPS_ON_NEXT_PAGE === '1' ? 'https' : 'http' ) + '://' + req.headers.host;
        next_page = `${myHost}/search?page=${page + 1}&per_page=${per_page}&query=${query.replaceAll(' ', '+')}&seed=${seed}`
        console.log('next_page: ', next_page)
        res.send({ page, per_page, photos, next_page })
    }
}

module.exports = { search }

//TEST
// http://localhost:3001/search?page=1&per_page=2&query=city_night&seed=4
// https://r-image2-api.vercel.app/search?page=1&per_page=2&query=city_night&seed=4