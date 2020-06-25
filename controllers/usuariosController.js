const Usuario = require("../models/Usuario");

exports.formularioCrearCuenta = (req, res, next) => {
    res.render("registrarse", { layout: "auth" });
};

exports.crearCuenta = async(req, res, next) => {
    const { fullname, email, password } = req.body;
    try {
        await Usuario.create({ fullname, email, password });
        res.render("iniciar_sesion", { layout: "auth", error });
    } catch (error) {
        res.render("registrarse", { layout: "auth" });
        console.log("Usuario no agregado", error);
    }
};
exports.formularioIniciarSesion = (req, res, next) => {
    //verificar si existe algun mensaje
    const messages = res.locals.messages;
    res.render("iniciar_sesion", { layout: "auth", messages });
};