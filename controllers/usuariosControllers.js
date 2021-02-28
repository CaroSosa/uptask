const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

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
    const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;
    const usuario = { email };
    const opciones = {
      usuario,
      subject: 'Confirmación de cuenta',
      confirmarUrl,
      archivo: 'confirmar-cuenta',
    };
    await enviarEmail.enviar(opciones);
    req.flash('correcto', 'Te enviamos un correo, confirma tu cuenta');
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
const confirmarCuenta = async (req, res) => {
  const cuentaConfirmada = await Usuarios.findOne({
    where: {
      email: req.params.email,
    },
  });
  if (!cuentaConfirmada) {
    req.flash('error', 'El email ingresado no es válido');
    res.redirect('/crear-cuenta');
  } else {
    cuentaConfirmada.activo = 1;
    await cuentaConfirmada.save();
    req.flash('correcto', 'Cuenta activada correctamente');
    res.redirect('/iniciar-sesion');
  }
};
module.exports = {
  formCrearCuenta,
  crearCuenta,
  formIniciarSesion,
  reestablecerPassword,
  confirmarCuenta,
};
