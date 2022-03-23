/*********************************************/
/********** Clase 06 -Servidores Web *********/ 
/************* Desafio Entregable ************/ 
/*********** Alumno: Emmanuel Pinto **********/ 
/*********************************************/

/************************************/
/*********** EXPRESS JS ** **********/
/************************************/

const express = require("express");
const random = require("random");
const fs = require("fs")
const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Contenedor = require("./contenedor.js");
const contenedor = new Contenedor("./productos.txt");


/********* INICIA SERVIDOR ********/

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Este es el error ${error}`))

/********* PETICIONES ********/

productAll = async () => {
    let productos = await contenedor.getAll();
    return productos;
}

app.get('/', (req, res) => {
    res.send('<h1 style="color:blue">Bienvenidos al servidor</h1><h3>Ingresa a "/productos" para obtener el listado completo.</h3><h3>Ingresa a "/productosRandom" para obtener un produco del listado al azar.</h3>')
})

app.get('/productos', (req, res) => {
    productAll().then( prod => res.send( prod ) );
})

app.get('/productosrandom', (req, res) => {
    productAll().then( prod => res.send( prod[random.int(0, 3)] ) );
})

