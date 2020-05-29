// My primer programa de negocios web con lenguaje de plataforma base JavaScript
// importar los modulos de express,js
const express = require('express');

//importar todas las rutas disponibles
const routes=require("./routes");

//crear conexion con la base de datos
const db = require("./config/db");

// Realizar la conexion a la base de datos
// Sequilize se conecta mediante porimese
db  .sync()
    .then(() => console.log("Conectado al servidor de BD"))
    .catch((error) => console.log(error));



// crear un servidor de express
const app=express();

//indicarle a express donde estan las rutas del servidor
app.use("/", routes());

//inicializar el servidor en un puerto en especifico
app.listen(7000, () =>{
    console.log("Servidor Iniciado en el puerto 7000");
});