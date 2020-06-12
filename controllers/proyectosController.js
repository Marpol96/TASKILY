//importar modelos necesarios
const Proyecto = require("../models/Proyecto");
exports.home = (req, res, next) => {
    res.render("crear_proyecto");
}

//conexion para almacenar en la base de datos asincrona(async / await)
exports.nuevoProyecto = async(req, res, next) => {
    //validar el input del formulario tenga valor
    //para acceder a los valores y asignarlos en un solo paso
    //vamos a utilizar destructuring.
    const { nombre } = req.body;

    //errores
    const mensajes = [];

    //verificar que nombre del proyecto tiene un valor
    if (!nombre) {
        mensajes.push({
            error: "El nombre del proyecto no puede ser vacio",
            type: "alert-danger",
        });
    }

    //si hay errores
    if (mensajes.length) {
        res.render("crear_proyecto", {
            mensajes: mensajes,
        });
    } else {
        //si no hay errores aqui deberia insertar el proyecto a la base de datos
        //almacenar en la base dedatos
        await Proyecto.create({ nombre });
        try {
            mensajes.push({
                error: "Proyecto almacenado satisfactoriamente",
                type: "alert-success",
            });
            res.render("crear_proyecto", {
                mensajes,
            });
        } catch (error) {
            mensajes.push({
                error: "Ha ocurrido un error interno en el servidor. Comunicate con el personas de Taskily",
                type: "alert-danger",
            });
        }
    }
};

//obtener todos los proyectos
exports.proyectosHome = async(req, res, next) => {
    const mensajes = [];
    try {
        //variable que almacene todos los proyectos
        const proyectos = await Proyecto.findALL();
        res.render("home_proyecto", { proyectos });
    } catch (error) {
        //crear mensaje de error
        mensajes.push({
            error: "Error al obtener los proyectos. Favor reintentar",
            type: "alert-warning",
        });
        res.render("home_proyecto", { mensajes });

    }
}