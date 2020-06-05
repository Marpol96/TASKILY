// My primer programa de negocios web con lenguaje de plataforma base JavaScript
// importar los modulos de express,js
const express = require("express");

//importar Handlebars
const exphbs = require("express-handlebars");

//importar body parser que nor permite acceder a la direccionde la peticion en http
const bodyParser = require("body-parser");

//importar todas las rutas disponibles
const routes = require("./routes");

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

//indicarle a express donde estan las rutas del servidor
app.use("/", routes());

//inicializar el servidor en un puerto en especifico
app.listen(7000, () => {
    console.log("Servidor Iniciado en el puerto 7000");
});