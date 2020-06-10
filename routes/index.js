//importar express router
const express = require("express");
const routes = express.Router();

//importar controladores
const proyectosController = require("../controllers/proyectosController");
//construir rutas disponibles para el servidor, las rutas deben 
//exportarse para porder ser utilizadas en otros archivos
module.exports = function() {
    routes.get("/", proyectosController.home);
    routes.post("/nuevo_proyecto", proyectosController.nuevoProyecto);

    //vista de proyectos
    routes.get("/home_proyecto", proyectosController.proyectosHome);
    return routes;
}