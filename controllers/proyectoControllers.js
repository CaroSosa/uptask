const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectoHome = async (req, res) => {
  const ListaProyectos = await Proyectos.findAll();
  res.render('index', {
    nombrePagina: 'Proyectos',
    ListaProyectos,
  });
};
exports.formularioProyecto = async (req, res) => {
  const ListaProyectos = await Proyectos.findAll();
  res.render('nuevoProyecto', {
    nombrePagina: 'Nuevo Proyecto',
    ListaProyectos,
  });
};
exports.nuevoProyecto = async (req, res) => {
  const { nombre } = req.body;
  let errores = [];
  if (!nombre) {
    errores.push({ texto: 'Agrega un nombre al proyecto' });
  }
  if (errores.length > 0) {
    const ListaProyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
      nombrePagina: 'Nuevo Proyecto',
      ListaProyectos,
      errores,
    });
  } else {
    const proyecto = await Proyectos.create({ nombre });
    res.redirect('/');
  }
};
exports.proyectoPorUrl = async (req, res, next) => {
  const ListaProyectos = await Proyectos.findAll();
  const infoProyecto = await Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });
  if (!infoProyecto) return next();
  res.render('tareas', {
    nombrePagina: 'Tareas del proyecto',
    infoProyecto,
    ListaProyectos,
  });
};
exports.formularioEditar = async (req, res) => {
  const ListaProyectos = await Proyectos.findAll();
  const proyectoEditar = await Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.render('nuevoProyecto', {
    nombrePagina: 'Editar Proyecto',
    ListaProyectos,
    proyectoEditar,
  });
};
exports.actualizarProyecto = async (req, res) => {
  const { nombre } = req.body;
  let errores = [];
  if (!nombre) {
    errores.push({ texto: 'Agrega un nombre al proyecto' });
  }
  if (errores.length > 0) {
    const ListaProyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
      nombrePagina: 'Nuevo Proyecto',
      ListaProyectos,
      errores,
    });
  } else {
    await Proyectos.update(
      { nombre: nombre },
      { where: { id: req.params.id } }
    );
    res.redirect('/');
  }
};
exports.eliminarProyecto = async (req, res) => {
  const ListaProyectos = await Proyectos.findAll();
  const proyectoEditar = await Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });
};
