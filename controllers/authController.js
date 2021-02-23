const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');

const autenticarUsuario = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/iniciar-sesion',
  failureFlash: true,
  badRequestMessage: 'Ambos campos son obligatorios',
});
const usuarioAutenticado = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/iniciar-sesion');
  }
};
const cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/iniciar-sesion');
  });
};
const enviarToken = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!usuario) {
    req.flash('error', 'No existe esa cuenta');
    res.render('reestablecer', {
      nombrePagina: 'Reestablecer tu contraseña',
      mensajes: req.flash(),
    });
  } else {
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;
    await usuario.save();
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    console.log(resetUrl);
  }
};
const validarToken = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
    },
  });
  if (!usuario) {
    req.flash('error', 'No válido');
    res.redirect('/reestablecer');
  } else {
    res.render('resetPassword', {
      nombrePagina: 'Reestablecer Contraseña',
    });
  }
};
const actualizarPassword = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiracion: {
        [Op.gte]: Date.now(),
      },
    },
  });
  if (!usuario) {
    req.flash('error', 'No válido'), res.redirect('/reestablecer');
  }
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiracion = null;
  await usuario.save();
  req.flash('correcto', 'Ahora puedes iniciar sesión');
  res.redirect('/iniciar-sesion');
};
module.exports = {
  autenticarUsuario,
  usuarioAutenticado,
  cerrarSesion,
  enviarToken,
  validarToken,
  actualizarPassword,
};
