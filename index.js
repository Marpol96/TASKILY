// My primer programa de negocios web con lenguaje de plataforma base JavaScript
// importar los modulos de express,js
const express = require("express");

//importar Handlebars
const exphbs = require("express-handlebars");

//importar body parser que nor permite acceder a la direccionde la peticion en http
const bodyParser = require("body-parser");

//importar todas las rutas disponibles
const routes = require("./routes");

//importar passport para inisiar secion
const passport = require("./config/passport");

// Importar express-session para manejar las sesiones de usuario
const session = require("express-session");
// Importar cookie-parser para habilitar el manejo de cookies en el sitio
const cookieParser = require("cookie-parser");
// Importar connect-flash para disponer de los errores en todo el sitio
const flash = require("connect-flash");

//crear conexion con la base de datos
const db = require("./config/db");

//importar modelos
require("./models/Proyecto");

// Realizar la conexion a la base de datos
// Sequilize se conecta mediante porimese
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise
db.sync()
    .then(() => console.log("Conectado al servidor de BD"))
    .catch((error) => console.log(error));



// crear un servidor de express
const app = express();

// Indicarle al servidor la carpeta de archivos estáticos
app.use(express.static("public"));

//indiar el template engine a utilizar (Handlebars)
app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main",
        extname: ".hbs",
    })
);

app.set("view engine", "hbs");

//habilitar body parser para leer los datos enviados por POST
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar el uso de cookieParser
// https://www.npmjs.com/package/cookie-parser
app.use(cookieParser());

// Habilitar las sesiones de usuario
// Las sesiones les permiten al usuario navegar entre las distintas
// páginas del sitio con una sola autenticación
// https://www.npmjs.com/package/express-session
app.use(
    session({
        secret: process.env.SESSIONSECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// Habilitar el uso de connect-flash para compartir mensajes
// https://github.com/jaredhanson/connect-flash
// TODO: Verificar el funcionamiento con Express V4+
app.use(flash());

//crear una instancia de passport y cargar nuestra estrategia
app.use(passport.initialize());
app.use(passport.session());

// Pasar algunos valores mediante middleware
app.use((req, res, next) => {
    // Pasar el usuario a las variables locales de la petición
    res.locals.usuario = {...req.user } || null;
    res.locals.messages = req.flash();
    // Continuar con el camino del middleware
    next();
});

//indicarle a express donde estan las rutas del servidor
app.use("/", routes());

//inicializar el servidor en un puerto en especifico
app.listen(7000, () => {
    console.log("Servidor Iniciado en el puerto 7000");
});