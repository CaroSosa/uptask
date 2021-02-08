const express = require('express');
const router = express.Router();

const proyectoController = require('../controllers/proyectoControllers.js');

//Importar express validator
const { body } = require('express-validator');

module.exports = function () {
  router.get('/', proyectoController.proyectoHome);
  router.get('/nuevo-proyecto', proyectoController.formularioProyecto);
  router.post(
    '/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(),
    proyectoController.nuevoProyecto
  );
  router.get('/proyectos/:url', proyectoController.proyectoPorUrl);
  router.get('/proyectos/editar/:id', proyectoController.formularioEditar);
  router.post(
    '/nuevo-proyecto/:id',
    body('nombre').not().isEmpty().trim().escape(),
    proyectoController.actualizarProyecto
  );
  return router;
};
