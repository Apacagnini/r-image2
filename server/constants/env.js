const dotenv = require('dotenv');
dotenv.config();
const FORCE_HTTPS_ON_NEXT_PAGE = process.env.VERCEL === '1' ? '1' : '0'

module.exports = { FORCE_HTTPS_ON_NEXT_PAGE }