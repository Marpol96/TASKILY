//importar express router
const express = require("express");
const routes = express.Router();

//importar controladores
const proyectosController = require("../controllers/proyectosController");
const usuarioController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");

const prestamosController = require("../controllers/prestamosController");
//construir rutas disponibles para el servidor, las rutas deben 
//exportarse para porder ser utilizadas en otros archivos
module.exports = function() {
    routes.get("/", proyectosController.proyectoHome);

    routes.post("/nuevo_proyecto", proyectosController.nuevoProyecto);

    //vista de proyectos
    routes.get("/nuevo_proyecto", proyectosController.formularioNuevoProyecto);

    //rutas para autentificacion
    routes.get("/registrate", usuarioController.formularioCrearCuenta);
    routes.post("/registrate", usuarioController.crearCuenta);
    routes.get("/iniciar_sesion", usuarioController.formularioIniciarSesion);
    routes.post("/iniciar_sesion", authController.autentificarUsuario);
    //parte del examen
    routes.get("/prestamos", prestamosController.metodoFrances);

    routes.post("/prestamos", prestamosController.mostrarMetodoFrances);
    return routes;
}