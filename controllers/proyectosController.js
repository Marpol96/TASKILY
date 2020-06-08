//importar modelos necesarios
const Proyecto = require("../models/Proyecto");
exports.home = (req, res, next) => {
    res.render("crear_proyecto");
}
exports.nuevoProyecto = (req, res, next) => {
    //validar el input del formulario tenga valor
    //para acceder a los valores y asignarlos en un solo paso
    //vamos a utilizar destructuring.
    const { nombre, numero1, numero2 } = req.body;

    //errores
    const errores = [];

    //verificar que nombre del proyecto tiene un valor
    if (!nombre) {
        errores.push({ error: 'El nombre del proyecto no puede ser vacio' })
    }

    //si hay errores
    if (errores.length) {
        res.render("crear_proyecto", {
            errores: errores,
        });
    } else {
        //si no hay errores aqui deberia insertar el proyecto a la base de datos
        res.send("Insertado en la BD");
    }
};