const mongoose = require('mongoose')

const conDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/restaurante', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB conectado!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = conDB