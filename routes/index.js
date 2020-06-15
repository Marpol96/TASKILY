//importar express router
const express = require("express");
const routes = express.Router();

//importar controladores
const proyectosController = require("../controllers/proyectosController");
const prestamosController = require("../controllers/prestamosController");
//construir rutas disponibles para el servidor, las rutas deben 
//exportarse para porder ser utilizadas en otros archivos
module.exports = function() {
    routes.get("/", proyectosController.proyectoHome);

    routes.post("/nuevo_proyecto", proyectosController.nuevoProyecto);

    //vista de proyectos
    routes.get("/nuevo_proyecto", proyectosController.formularioNuevoProyecto);

    //parte del examen
    routes.get("/prestamos", prestamosController.metodoFrances);

    routes.post("/prestamos", prestamosController.mostrarMetodoFrances);
    return routes;
}