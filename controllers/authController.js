// passport
const passport = require("passport");
// modelo de usuario
const Usuario = require("../models/Usuario");
//importar sequilice
const Sequilize = require("sequelize");

//verificar si el usuario se puede auntetificar con sus credenciales
exports.autentificarUsuario = passport.authenticate(`local`, {
    successRedirect: "/",
    failureRedirect: "/iniciar_sesion",
    badRequestMessage: "Debes ingresar tu correo y tu contraseña",
    failureFlash: true,
});

//cerrar sesion del usuario actual
exports.cerrarSesion = (req, res, next) => {
    // Al cerrar sesión redirigimos al usuario al inicio de sesión
    req.session.destroy(() => {
        res.redirect("/iniciar_sesion");
    });
};

// Verificar si el usuario está autenticado o no
exports.usuarioAutenticado = (req, res, next) => {
    // Si el usuario está autenticado que continúe con la petición
    if (req.isAuthenticated()) {
        return next();
    }

    // Si el usuario no está autenticado, iniciar sesión
    return res.redirect("/iniciar_sesion");
};