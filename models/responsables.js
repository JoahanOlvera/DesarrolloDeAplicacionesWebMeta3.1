'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Responsables extends Model {
    static associate(models) {
      Responsables.hasMany(models.Activos, {
        foreignKey: 'responsableId', // Nombre de la clave externa en la tabla de Activos
      });
    }
  }
  Responsables.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    numeroEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Responsables',
  });
  return Responsables;
};
