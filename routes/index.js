//importar express router
const express=require("express");
const routes = express.Router();

//importar controladores
const proyectosController =require("../controllers/proyectosController");
//construir rutas disponibles para el servidor, las rutas deben 
//exportarse para porder ser utilizadas en otros archivos
module.exports = function(){
    routes.get("/home",proyectosController.home);
    routes.get("/holamundo", proyectosController.holamundo);
    return routes;
}