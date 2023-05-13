const { Router } = require('express')
const { sendNodemailer } = require('../controllers/sendNodemailer.controllers');
const { sendFormspree } = require('../controllers/sendFormspree.controller');

send = sendNodemailer; //select email system

const router = Router()

router.post('/send', send )

module.exports = router