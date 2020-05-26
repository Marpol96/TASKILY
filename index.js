// importar los modulos de express,js
const express = require('express');

// crear un servidor de express
const app=express();

//inicializar el servidor en un puerto en especifico
app.listen(7000, () =>{
    console.log("Servidor Iniciado en el puerto 7000");
})