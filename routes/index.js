const express = require('express');
const router = express.Router();

const proyectoController = require('../controllers/proyectoControllers.js');

module.exports = function () {
  router.get('/', proyectoController.proyectoHome);
  router.get('/nuevo-proyecto', proyectoController.formularioProyecto);
  router.post('/nuevo-proyecto', proyectoController.nuevoProyecto);
  return router;
};
