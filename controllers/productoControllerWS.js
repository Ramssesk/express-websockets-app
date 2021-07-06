const Producto = require('../models/Producto')
const Orden = require('../models/Orden')
const {GET_NEW_PRODUCTO, EXISTENCIA_PRODUCTO, SET_ORDEN_PRINCIPAL} = require('../actions/productos.action')
const { v4: uuidv4 } = require('uuid');


exports.productoController = async (ws, socket, message) => {
    const body = JSON.parse(message)
    const wsClients = ws.clients
    
    switch(body.type) {
        case GET_NEW_PRODUCTO:
            const productos = await Producto.find({ tipo:"menu"}).sort({ creado: -1 })
            const resGetProducto = JSON.stringify({productos:productos.pop()})
            resGetProducto.action = 'getNewProducto'
            sendDataAll(resGetProducto, wsClients)
            break;
            
        case EXISTENCIA_PRODUCTO:
            const json = {}
            const existencia = await Producto.find({"_id": body.data.id}).sort({ creado: -1 })
            json.producto = existencia
            json.id = body.data.id
            body.data.existe === "false" ? json.action = 'existenciaProducto' : json.action = 'addProducto'
            const res = JSON.stringify(json)
            sendData(res, wsClients, ws)
            break;

        case SET_ORDEN_PRINCIPAL:
            console.log(body.data.orden)
            try {
                console.log('1')
                let ordenesjs = {}
                ordenesjs.pedido = body.data.orden
                console.log('2')
                
                const dataOrden = body.data.orden
                const ordenes = new Orden({ 
                    total: dataOrden.total, 
                    pedido:[{ 
                        subTotal: dataOrden.total, 
                        cantidad: dataOrden.cantidad,
                        producto: dataOrden._id
                    }]
                })
                console.log(ordenes)
                ordenes ? console.log('save ordenes') : console.log('dont save ordenes')
                // const ordenesNoListas = await Orden.find({"listo":"false"}).sort({creado: -1})
                // console.log('3')
                // ordenesjs.action = 'setOrden'
                // ordenesjs.noListas = ordenesNoListas
                // const resOrdenes = JSON.stringify({ordenesjs})
                // sendData(resOrdenes, wsClients, ws)
                // console.log('4')
            } catch (error) {
                console.log(error)
            }
            break;
    }
}
        
const sendDataAll = (res, wsClients) => {
    wsClients.forEach( client => {
        return client.send(res)
    })
}

const sendData = (res, wsClients, ws) => {
    wsClients.forEach(client => {
        if(client !== ws) client.send(res)
    })
}