// importar passport npm install --save passport
const passport = require("passport");
//utilizar la estrategia local
const LocalStrategy = require("passport-local");
//importar la referencia al modelo de autentificacion
const Usuario = require("../models/Usuario");

//definir nuestra estrategia de autentificacion
//local strategy -----> realizar un login
passport.use(
    new LocalStrategy(
        //pr defecto passport en localstrategy requiere de un usuario y una contraseña
        {
            usernameField: "email",
            passportField: "password"
        },
        //verificacion
        async(email, password, done) => {
            try {
                //Realizar la busqueda del usuario
                const usuario = await Usuario.findOne({
                    where: { email }
                });

                //si el usuario existe,verificar si su contraseña es correcta
                if (usuario.comparePassword(password)) {
                    return done(null, false, {
                        message: "Nombre de usuario o contraseña incorrecta.",
                    });
                }

                //El usuario y la contraseña esta correcta
                return done(null, usuario);
            } catch (error) {
                //El usuario no existe
                return done(null, false, {
                    message: "La cuenta de correo electronico no se encuentra",
                });
            }
        }
    )
);

//permitir que passport lea los valores del objeto usuario
//serializarlo el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//deserealizar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
})

module.exports = passport;