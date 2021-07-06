const WebSocket = require('ws')
const wss = new WebSocket.Server({port:4001})

wss.on('connection', function connection(ws, req){
    ws.on('message', function incoming(message){
        console.log('new client')
        wss.clients.forEach(client => {
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(message)
            }
        })
    })
})