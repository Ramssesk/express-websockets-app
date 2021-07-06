const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token')
    if(!token) return res.status(401).json({msg: "No hay Token"})

    try {
        //obtiene la info del payload
        const decode = jwt.verify(token, 'secretalapalabra')
        req.usuario = decode.usuario
        // req.usuario = decode.usuario
        next() //pasa al siguiente middleware con la informacion
    } catch (error) {
        res.status(401).json({msg: 'Token no valido'})
    }
}