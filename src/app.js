import express from 'express';
import {Server} from 'socket.io'
import Productos from './container.js';
import productRouter from './Routes/productos.js'
import __dirname from './utils.js'


const app = express();
app.set('views', '/views');
app.set('view engine', 'ejs');

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Listening in PORT ${PORT}`)
})
server.on( 'error', err => console.log( 'Error en el server: ' + err ) );

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', productRouter)
app.use('/public', express.static(__dirname + '/public'))

const product = new Productos('productos.txt');
const msj = new Productos('mensajes.txt')

app.get('/index', (req, res)=>{
    res.render( 'index', {message: 'producto agregado'} )
})

app.get('/products', (req, res)=>{
    res.render( 'products', {product: product.data} )
}) 
app.get('/', (req, res) => {
    res.render('messages', {messages: msj.data})
})


const io = new Server(server)

io.on('connection', socket => {
    socket.on('add', data => {
        console.log(data)
        products.push(data)
        io.sockets.emit('show', product)
    })

    io.on('chat-in', data => {
        const dateString = new Date().toLocaleString()
        const dataOut = {
            msn: data.msn,
            username: data.username,
            date: dateString
        }
        console.log(dataOut)
        msj.save(dataOut)

        io.sockets.emit('chat-out', 'ok')
    })
})
