const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const path = require('path');
const helpers = require('./helpers');
const { body, validationResult } = require('express-validator');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Crear la conexión a la base de datos
const db = require('./config/db');

require('./models/Usuarios');
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
  .then(() => console.log('Conectado al servidor'))
  .catch((err) => console.log(err));

//Crear una app de express
const server = express();

//Habilitar bodyParser para leer datos del form
server.use(bodyParser.urlencoded({ extended: true }));

//Donde cargar archivos estáticos
server.use(express.static('public'));

//Habilitar Pug
server.set('view engine', 'pug');

//Agregar flash messages
server.use(flash());

//Sesiones nos permiten navegar en distintas páginas sin volvernos a autenticar
server.use(
  session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false,
  })
);

//Pasar var dump a la app
server.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  next();
});

//Añadir carpeta de las vistas
server.set('views', path.join(__dirname, 'views'));

server.listen(3000);
server.use('/', routes());
