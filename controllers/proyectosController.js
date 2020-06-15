//importar modelos necesarios
const Proyecto = require("../models/Proyecto");
exports.formularioNuevoProyecto = (req, res, next) => {
    res.render("crear_proyecto");
};

//conexion para almacenar en la base de datos asincrona(async / await)
exports.nuevoProyecto = async(req, res, next) => {
    //validar el input del formulario tenga valor
    //para acceder a los valores y asignarlos en un solo paso
    //vamos a utilizar destructuring.
    const { nombre, descripcion } = req.body;

    //errores
    const mensajes = [];

    //verificar que nombre del proyecto tiene un valor
    if (!nombre) {
        mensajes.push({
            error: "El nombre del proyecto no puede ser vacio",
            type: "alert-danger",
        });
    }
    if (!descripcion) {
        mensajes.push({
            error: "Debes ingresar una breve descripcion del proyecto.",
            type: "alert-danger",
        });
    }

    //si hay errores
    if (mensajes.length) {
        res.render("crear_proyecto", {
            mensajes,
        });
    } else {
        //si no hay errores aqui deberia insertar el proyecto a la base de datos
        //almacenar en la base dedatos
        try {
            await Proyecto.create({ nombre, descripcion });
            mensajes.push({
                error: "Proyecto almacenado satisfactoriamente",
                type: "alert-success",
            });
            res.redirect("/");
        } catch (error) {
            mensajes.push({
                error: "Ha ocurrido un error interno en el servidor. Comunicate con el personas de Taskily.",
                type: "alert-danger",
            });
        }
    }
};

//obtener todos los proyectos
exports.proyectoHome = async(req, res, nex) => {
    const mensaje = [];

    try {
        const proyectos = await Proyecto.findAll();
        res.render("home_proyecto", { proyectos });
    } catch (error) {
        mensaje.push({
            error: "Error al obtener los proyectos. Favor reintentar",
            type: "alert-warning"
        });
        res.render("home_proyecto", { mensaje });
    }
};