exports.proyectoHome = (req, res) => {
  res.render('index', {
    nombrePagina: 'Proyectos',
  });
};
exports.formularioProyecto = (req, res) => {
  res.render('nuevoProyecto', {
    nombrePagina: 'Nuevo proyecto',
  });
};
exports.nuevoProyecto = (req, res) => {
  const { nombre } = req.body;
  let errores = [];
  if (!nombre) {
    errores.push({ texto: 'Agrega un nombre al proyecto' });
  }
  if (errores.lenght > 0) {
    res.render('nuevoProyecto', {
      nombrePagina: 'Nuevo Proyecto',
      errores: 'a',
    });
  }
};
