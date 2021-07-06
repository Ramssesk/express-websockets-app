const mongoose = require ('mongoose')

const OrdenSchema = mongoose.Schema({
    total: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    pedido: [{
        subTotal: {
            type: mongoose.Types.Decimal128,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        producto: {
            ref: Schema.Types.ObjectId,
            required: true
        },
        listo: {
            type: Boolean,
            required: true,
            default: false
        }
    }],
    creado: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Orden', OrdenSchema);