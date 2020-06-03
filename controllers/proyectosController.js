//importar modelos necesarios
const Proyecto = require("../models/Proyecto");
exports.home = (req,res,next) => {
    res.render("crear_proyecto");
}
exports.nuevoProyecto = (req,res,next) => {
    res.send("Aqui se crea un nuevo proyecto");
}