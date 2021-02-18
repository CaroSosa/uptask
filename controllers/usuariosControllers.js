const formCrearCuenta = (req, res) => {
  res.render('crearCuenta', {
    nombrePagina: 'Crear Cuenta en UpTask',
  });
};
const crearCuenta = async (req, res) => {
  res.send('enviaste el form');
};
module.exports = {
  formCrearCuenta,
  crearCuenta,
};
