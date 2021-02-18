const express = require('express');
const router = express.Router();

const proyectoController = require('../controllers/proyectoControllers.js');
const tareasController = require('../controllers/tareasControllers.js');
const usuariosController = require('../controllers/usuariosControllers.js');
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
  router.delete('/proyectos/:url', proyectoController.eliminarProyecto);
  router.post('/proyectos/:url', tareasController.agregarTarea);
  router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
  router.delete('/tareas/:id', tareasController.eliminarTarea);
  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta);

  return router;
};
