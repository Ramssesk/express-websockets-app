const express = require('express')
const router = express.Router()
const {obtOrden} = require('../controllers/ordenController')
const auth = require('../middleware/auth');

router.get('/',
    // auth,
    obtOrden
)


module.exports = router;