'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubicaciones extends Model {
    static associate(models) {
      Ubicaciones.hasMany(models.Activos, {
        foreignKey: 'ubicacionId', // Nombre de la clave externa en la tabla de Activos
      });
    }
  }
  Ubicaciones.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.BLOB('long'), // Uso correcto de LONG BLOB en el modelo
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Ubicaciones',
  });
  return Ubicaciones;
};
