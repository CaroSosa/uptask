const express = require('express');
const router = express.Router();

//Controladores
const proyectoController = require('../controllers/proyectoControllers.js');
const tareasController = require('../controllers/tareasControllers.js');
const usuariosController = require('../controllers/usuariosControllers.js');
const authController = require('../controllers/authController');
//Importar express validator
const { body } = require('express-validator');

module.exports = function () {
  router.get(
    '/',
    authController.usuarioAutenticado,
    proyectoController.proyectoHome
  );
  router.get(
    '/nuevo-proyecto',
    authController.usuarioAutenticado,
    proyectoController.formularioProyecto
  );
  router.post(
    '/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(),
    proyectoController.nuevoProyecto
  );
  router.get(
    '/proyectos/:url',
    authController.usuarioAutenticado,
    proyectoController.proyectoPorUrl
  );
  router.get(
    '/proyectos/editar/:id',
    authController.usuarioAutenticado,
    proyectoController.formularioEditar
  );
  router.post(
    '/nuevo-proyecto/:id',
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectoController.actualizarProyecto
  );
  router.delete(
    '/proyectos/:url',
    authController.usuarioAutenticado,
    proyectoController.eliminarProyecto
  );
  router.post(
    '/proyectos/:url',
    authController.usuarioAutenticado,
    tareasController.agregarTarea
  );
  router.patch(
    '/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea
  );
  router.delete(
    '/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.eliminarTarea
  );
  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta);
  router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
  router.post('/iniciar-sesion', authController.autenticarUsuario);
  router.get('/cerrar-sesion', authController.cerrarSesion);
  router.get('/reestablecer', usuariosController.reestablecerPassword);
  router.post('/reestablecer', authController.enviarToken);
  router.get('/reestablecer/:token', authController.validarToken);
  router.post('/reestablecer/:token', authController.actualizarPassword);
  router.get('/confirmar/:email', usuariosController.confirmarCuenta);
  return router;
};
