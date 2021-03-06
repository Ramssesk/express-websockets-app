const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer el correo y contra
    const { correo, contra } = req.body;
console.log(correo)
    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email: correo });
        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        const pwdCorrecto = await bcryptjs.compare(contra, usuario.pwd);
        if(!pwdCorrecto) {
            return res.status(400).json({msg: 'contra Incorrecto' })
        }

         const payload = {
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre
            }
        };

        // firmar el JWT
        jwt.sign(payload, 'secretalapalabra', {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
            res.json({ token  });
        });

    } catch (error) {
        console.log(error);
    }
}

exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-contra');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}