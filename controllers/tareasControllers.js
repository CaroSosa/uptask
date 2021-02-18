const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

const agregarTarea = async (req, res, next) => {
  const proyecto = await Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });
  const { tarea } = req.body;
  const estado = 0;
  const proyectoId = proyecto.id;
  const resultado = await Tareas.create({ tarea, estado, proyectoId });
  if (!resultado) {
    next();
  }
  res.redirect(`/proyectos/${req.params.url}`);
};
const cambiarEstadoTarea = async (req, res, next) => {
  const tareaACambiar = await Tareas.findOne({
    where: {
      id: req.params.id,
    },
  });
  let estado = 0;
  if (tareaACambiar.estado === estado) {
    estado = 1;
  }
  tareaACambiar.estado = estado;
  const resultado = await tareaACambiar.save();
  if (!resultado) return next();
  res.status(200).send('todo ok');
};
const eliminarTarea = async (req, res, next) => {
  const { id } = req.params;
  const resultado = await Tareas.destroy({ where: { id } });
  if (!resultado) return next();
  res.status(200).send('Tarea eliminada correctamente');
};

module.exports = {
  agregarTarea,
  cambiarEstadoTarea,
  eliminarTarea,
};
