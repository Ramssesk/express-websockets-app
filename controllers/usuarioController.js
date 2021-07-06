const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const fs = require('fs')

exports.crearUsuario = async (req, res) => {    

    const errores = validationResult(req)
    if(!errores.isEmpty()) return res.status(400).json({errores: errores.array()})
    
    const {email, pwd, pwdConfirm} = req.body
    
    try {
        let usuario = await Usuario.findOne({email})
        if(usuario) return res.status(400).json({msg:'Usuario existe'})

        usuario = new Usuario(req.body)

        const salt = await bcryptjs.genSalt(10)
        usuario.pwd = await bcryptjs.hash(pwd, salt)
        usuario.pwdConfirm = await bcryptjs.hash(pwdConfirm, salt)
        
        await usuario.save()
        
        const payload = {
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre
            }
        }

        jwt.sign(payload, 'secretalapalabra', {
            expiresIn: 36000 //10hr
        }, (error, token) => {
            if(error) throw error

            res.json({token})
        })
        
        // res.json({msg: 'Usiario creado correctamente'})
    } catch (error) {
        console.log('error user',error)
        res.status(400).send('Hubo un error')
    }
}