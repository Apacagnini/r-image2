const dotenv = require('dotenv');
dotenv.config();

const send = async (req, res, next) => {
    try {
        const response = await fetch(process.env.FORMSPREE_SUBMIT_URL, {
            method: 'post',
            body: JSON.stringify(req.body),
            headers: {
                'Accept': 'application/json'
            }
        });
        const jsonData = await response.json();
        res.send(jsonData);
    } catch (error) {
        console.log('Error sending mail: ',error);
        res.send({ok:false});
    }
}

module.exports = { send }