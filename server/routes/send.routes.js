const { Router } = require('express');
const dotenv = require('dotenv');
dotenv.config();

const { send } = process.env.SENDSYSTEM === 'Nodemailer'? require('../controllers/sendNodemailer.controllers') : require('../controllers/sendFormspree.controller');
const router = Router();
router.post('/send', send );

module.exports = router;