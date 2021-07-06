const express = require('express')
const router = express.Router()
const {crearProducto, obtProductos, actualizarExistencia} = require('../controllers/productoController')
const auth = require('../middleware/auth');
const { check } = require('express-validator')
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: './public/files',
    filename: (req, file, cb) => {
        console.log(file)
        cb(null,`${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

router.post('/', upload.single("imagen"),
    // [
    //     check('existencia').not().isEmpty(),
    //     check('nombre').not().isEmpty(),
    //     check('precio').not().isEmpty(),
    //     check('categoria').not().isEmpty(),
    //     check('imagen').not().isEmpty(),
    //     check('descripcion').not().isEmpty()
    // ],
    crearProducto
)

router.get('/',
    // auth,
    obtProductos
)

router.put('/:id', 
    actualizarExistencia
)

module.exports = router;