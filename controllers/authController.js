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
    badRequestMessage: "Debes ingresai tu correo y tu contraseña",
});