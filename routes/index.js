//importar express router
const express=require("express");
const routes = express.Router();

//construir rutas disponibles para el servidor, las rutas deben 
//exportarse para porder ser utilizadas en otros archivos
module.exports = function(){
    routes.get('/');
    return routes;
}