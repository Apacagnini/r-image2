const { searchModel } = require('../models/Search.model');
const { defaultSearch } = require('../constants/defaultSearch');
const { categoriesList } = require('../constants/categoriesList');
const { fetchPexels } = require('../utils/fetchPexels');
const { FORCE_HTTPS_ON_NEXT_PAGE } = require('../constants/env');

async function savePhotos(json, category) {
    if ("photos" in json) {
        json.photos.forEach(async element => {
            const search_id = await searchModel.find({ id: element.id });
            if (search_id.length == 0) {
                element['category'] = [category]
                const task = new searchModel(element)
                await task.save();
            } else if (!search_id[0].category.includes(category)) {
                await searchModel.updateOne({ id: element.id }, { $push: { category } })
            }
        })
    }
}

async function photosRandom(category, page, per_page, seed) {
    seed = Number(seed)
    let Skip = per_page * (page - 1)
    photos = await searchModel.aggregate([
        { $match: { category } },
        {
            $addFields: {
                hash: {
                    $function: {
                        body: function(id, seed){
                            s = String(id+seed)
                            let h = 0, i = s.length;
                            while (i > 0) {
                                h = (h << 5) - h + s.charCodeAt(--i) | 0;
                            }
                            return h;
                            },
                        args: ["$id",seed],
                        lang: "js"
                    }
                }
            }
        },
        { $sort: { hash: 1 } },
        { $skip : Skip },
        { $limit : per_page }
    ])
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

    if (categoriesList.includes(query.replaceAll('_', ' ').replaceAll('+', ' '))){
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
        let myHost = ( req.secure || FORCE_HTTPS_ON_NEXT_PAGE === '1' ? 'https' : 'http' ) + '://' + req.headers.host;
        next_page = `${myHost}/search?page=${page + 1}&per_page=${per_page}&query=${query.replaceAll(' ', '+')}&seed=${seed}`;
        console.log('next_page: ', next_page);
        res.send({ page, per_page, photos, next_page });
    }
}

module.exports = { search }

//TEST
// http://localhost:3001/search?page=1&per_page=2&query=city_night&seed=4
// https://r-image2-api.vercel.app/search?page=1&per_page=2&query=city_night&seed=4