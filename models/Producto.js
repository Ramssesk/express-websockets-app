const mongoose = require ('mongoose')

const ProductoSchema = mongoose.Schema({
    existencia: {
        type: Boolean,
        default: true
    },
    tipo: {
        type: String,
        default: 'menu',
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: mongoose.Types.Decimal128,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Producto', ProductoSchema);