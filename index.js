const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const path = require('path');
const helpers = require('./helpers');

//Crear la conexión a la base de datos
const db = require('./config/db');
const { nextTick } = require('process');

require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
  .then(() => console.log('Conectado al servidor'))
  .catch((err) => console.log(err));

//Crear una app de express
const server = express();

//Donde cargar archivos estáticos
server.use(express.static('public'));

//Habilitar Pug
server.set('view engine', 'pug');

//Pasar var dump a la app
server.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

//Añadir carpeta de las vistas
server.set('views', path.join(__dirname, 'views'));

//Habilitar bodyParser para leer datos del form
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(3000);
server.use('/', routes());
