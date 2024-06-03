'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activos.belongsTo(models.Responsables, {
        foreignKey: 'responsableId', // Nombre de la clave externa en la tabla de Activos
        as: 'responsable'
      });
      Activos.belongsTo(models.Ubicaciones, {
        target_key:'ubicacionId',
        as: 'ubicacion'
      });
    }
  }
  Activos.init({
    id: {
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    numeroDeSerie: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    numeroDeInventario: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    descripcion: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
    },
    imagen: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    },
    responsableId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ubicacionId:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Activos',
  });
  return Activos;
};