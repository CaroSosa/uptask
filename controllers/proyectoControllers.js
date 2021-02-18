const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
const slug = require('slug');

const proyectoHome = async (req, res) => {
  const ListaProyectos = await Proyectos.findAll();
  res.render('index', {
    nombrePagina: 'Proyectos',
    ListaProyectos,
  });
};
const formularioProyecto = async (req, res) => {
  const ListaProyectos = await Proyectos.findAll();
  res.render('nuevoProyecto', {
    nombrePagina: 'Nuevo Proyecto',
    ListaProyectos,
  });
};
const nuevoProyecto = async (req, res) => {
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
const proyectoPorUrl = async (req, res, next) => {
  const ListaProyectos = await Proyectos.findAll();
  const infoProyecto = await Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });
  const tareas = await Tareas.findAll({
    where: {
      proyectoId: infoProyecto.id,
    },
  });
  if (!infoProyecto) return next();
  res.render('tareas', {
    nombrePagina: 'Tareas del proyecto',
    infoProyecto,
    ListaProyectos,
    tareas,
  });
};
const formularioEditar = async (req, res) => {
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
const actualizarProyecto = async (req, res) => {
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
const eliminarProyecto = async (req, res, next) => {
  const { urlProyecto } = req.query;
  const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });
  if (!resultado) {
    return next();
  }
  res.status(200).send('Proyecto eliminado correctamente');
};

module.exports = {
  proyectoHome,
  nuevoProyecto,
  formularioProyecto,
  proyectoPorUrl,
  actualizarProyecto,
  formularioEditar,
  eliminarProyecto,
};
