const Sequelize = require("sequelize");
const conexion = new Sequelize('uptask', "root", "",{
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorsAliases: 0,
    define:{
        timestamps: 0
    },
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle:10000
    }
});

module.exports= conexion;