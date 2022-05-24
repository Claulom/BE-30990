import express from 'express';
import {readFileSync} from 'fs';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Listening in PORT ${PORT}`)
})


let data = JSON.parse(readFileSync('./file/productos.txt', 'utf-8'))

app.get('/items', (req, res) =>{
    res.send({items: data, cantidad: data.length})
 
})

app.get('/item-random', (req,res)=>{
    res.send(data[Math.floor(Math.random() * data.length)])
  
})
app.on('error', error => console.log('Error on server', error))

