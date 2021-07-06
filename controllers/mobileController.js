const Producto = require('../models/Producto');
const { validationResult } = require('express-validator');

exports.obtProductosMobile = async (req,res) => {
    try {
        const existe = await Producto.find({existencia: "true"}).sort({ creado: -1 })
        res.status(200).send(existe)
    } catch (error) {
        console.log('ERRRRRRRR',error)
        res.status(500).send('Hubo un error')
    }
}