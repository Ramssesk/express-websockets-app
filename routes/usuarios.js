const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const {check} = require('express-validator')

router.post('/',
    [
        check('nombre', 'El nombre es requerido').notEmpty(),
        check('email', 'Email no valido').isEmail().escape().normalizeEmail(),
        check('pwd')
        .isLength({min: 6, max: 14}).withMessage('El password debe tener entre 6 caracteres 14')
        .matches('[0-9]').withMessage('Password debe tener un Numero')
        .matches('[A-Z]').withMessage('Password debe tener una Mayuscula')
        .matches('[a-z]').withMessage('Password de tene una Minusula'),
        check('pwdConfirm', 'Los password no son iguales').custom((value, { req }) => value === req.body.pwd)
    ],
usuarioController.crearUsuario)

module.exports = router