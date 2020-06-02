//importar sequelize
const Sequelize = require("sequelize");
require("dotenv").config({path: "variables.env"});
//establecer los parametros de la conexion a la base de datos
const db=new Sequelize("taskily",
process.env.MYSQLUSER,
process.env.MYSQLPASS,
{
    host: "localhost",
    dialect: "mysql",
    port: process.env.MYSQLPORT,
    //condicionantes
    operatorAliases: false,
    define: {
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
module. exports=db;