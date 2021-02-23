const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define(
  'usuarios',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      unique: {
        args: true,
        msg: 'El Email ingresado ya está en uso',
      },
      validate: {
        isEmail: {
          msg: 'Agrega un Email válido',
        },
        notEmpty: {
          msg: 'Necesitas ingresar una Email válido',
        },
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Necesitas agregar una contraseña',
        },
      },
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE,
  },
  {
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(
          usuario.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);

Usuarios.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
