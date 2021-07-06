const express = require ('express')
const conDB = require('./config/db')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const server = require('http').createServer(app)
const fbvid = require('fbvideos');

const video = 'https://fb.watch/v/1UDuJzYAH/';

fbvid.low(video).then(vid => {
    console.log(vid)
    // => { url: 'https://video.fpat1-1.fna.fbcdn.net/...mp4?934&oe=5972F363' }

});

fbvid.high(video).then(vid => {
    console.log(vid);
    // => { url: 'https://video.fpat1-1.fna.fbcdn.net/...mp4?934&OE=2kf2lf4g' }
});


// conDB()
app.use(morgan('combined'))
app.use(cors())
app.use(express.json({extended: true}))

const PORT = process.env.PORT || 4000

// app.use('/public/files', express.static('public/files'))
// app.use('/public/mobile', express.static('public/mobile'))

// app.use('/api/productos', require('./routes/productos'))
// app.use('/api/usuarios', require('./routes/usuarios'))
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/mobile', require('./routes/mobile'))
// app.use('/api/ordenes', require('./routes/orden'))
// app.use('/api/payments', require('./routes/payments'))

server.listen(PORT, () => {
    console.log(`puerto ${PORT}`)
})

// const WebSocket = require('ws')

// const ws = new WebSocket.Server({server:server})
// const {productoController} = require('./controllers/productoControllerWS')

// ws.on('connection', function connection(socket){
//     socket.isAlive = true
//     socket.on('pong', () => {
//         socket.isAlive = true
//     })

//     socket.on('message', function incoming(message) {
//         console.log('new client')

//         productoController(ws, socket, message)
//     })

//     socket.on('close', () => {
//         console.log('Lost Client')
//     })
// })