async function fetchPexels(page, per_page, query) {
    try {
        url = `https://api.pexels.com/v1/search?page=${page}&per_page=${per_page}&query=${query.replaceAll(' ', '+')}`;
        let fres = await fetch(url, { headers: { Authorization: process.env.PEXELS_API_KEY } });
        json = await fres.json();
        return json
    } catch (err) {
        let errText = err.statusText || "Error in fetch pexels";
        mesage = `Error ${err.status}: ${errText}`
        console.log(mesage);
        return {}
    }
}

module.exports = { fetchPexels }