const Usuarios = require('../models/Usuarios');

const formCrearCuenta = (req, res) => {
  res.render('crearCuenta', {
    nombrePagina: 'Crear Cuenta en UpTask',
  });
};
const crearCuenta = async (req, res) => {
  const { email, password } = req.body;
  try {
    await Usuarios.create({
      email,
      password,
    });
    res.redirect('/iniciar-sesion');
  } catch (error) {
    //Genera un objeto de errores
    req.flash(
      'error',
      error.errors.map((error) => error.message)
    );
    res.render('crearCuenta', {
      mensajes: req.flash(),
      nombrePagina: 'Crear Cuenta en UpTask',
      email,
      password,
    });
  }
};
const formIniciarSesion = async (req, res) => {
  const { error } = res.locals.mensajes;
  res.render('iniciarSesion', {
    nombrePagina: 'Iniciar sesion en UpTask',
    error,
  });
};

const reestablecerPassword = (req, res) => {
  res.render('reestablecer', {
    nombrePagina: 'Reestablecer tu contraseña',
  });
};
module.exports = {
  formCrearCuenta,
  crearCuenta,
  formIniciarSesion,
  reestablecerPassword,
};
