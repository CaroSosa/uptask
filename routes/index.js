const express = require('express');
const router = express.Router();

const proyectoController = require('../controllers/proyectoControllers.js');

module.exports = function () {
  router.get('/', proyectoController.proyectoHome);
  router.get('/1', (req, res) => {
    res.send('estas en 1');
  });
  return router;
};
