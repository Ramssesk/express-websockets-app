const Orden = require('../models/Orden');
const { validationResult } = require('express-validator');

exports.obtOrden = async (req,res) => {
    try {
        const existe = await Orden.find({listo: "false"}).sort({ creado: -1 })
        res.status(200).send(existe)
    } catch (error) {
        console.log('ERRRRRRRR',error)
        res.status(500).send('Hubo un error')
    }
}