const Producto = require('../models/Producto');
const { validationResult } = require('express-validator');
const fs = require('fs')
const sharp = require('sharp')
const path = require('path')

const mobileFile = async (files) => {
    const {filename: image } = files
    await sharp(files.path)
    .resize(500)
    .jpeg({quality: 50})
    .toFile(
        path.resolve('public/mobile',image)
    )
    // fs.unlinkSync(files.path)
return 'http://127.0.0.1:4000/'+'public\\mobile\\'+image
}

exports.crearProducto = async (req, res) => {
    
    // const errores = validationResult(req)
    // if(!errores.isEmpty()) return res.status(400).json({errores: errores.array()})

    try {
        // producto.creador = req.usuario.id;
        const producto = new Producto(req.body)
        producto.imagen = 'http://127.0.0.1:4000/'+req.file.path
        producto.mobile = await mobileFile(req.file)
        producto.save();
        res.status(200).send(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtProductos = async (req, res) => {
    console.log('si')
    try {
        const productos = await Producto.find().sort({ creado: -1 })
        res.json({productos})
    } catch (error) {
        console.log('ERRRRRRRR',error)
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarExistencia = async (req, res) => {
    try {
        const disponible = await Producto.updateOne({"_id": req.body._id}, {$set: {"existencia": req.body.existe}})
        const actualizado = await Producto.find({ _id:req.body._id }).sort({ creado: -1 })
        res.status(200).send(actualizado)
    } catch (error) {
        console.log(error)
    }
}