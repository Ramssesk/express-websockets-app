const express = require('express')
const router = express.Router()
const {obtProductosMobile} = require('../controllers/mobileController')
const auth = require('../middleware/auth');

router.get('/',
    // auth,
    obtProductosMobile
)


module.exports = router;