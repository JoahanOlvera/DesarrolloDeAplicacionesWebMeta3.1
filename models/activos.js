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
        as: 'responsable',
        onDelete: 'SET NULL', // Asegurarse de que la relación refleje la migración
        onUpdate: 'CASCADE'
      });
      Activos.belongsTo(models.Ubicaciones, {
        foreignKey: 'ubicacionId', // Nombre de la clave externa en la tabla de Activos
        as: 'ubicacion',
        onDelete: 'SET NULL', // Asegurarse de que la relación refleje la migración
        onUpdate: 'CASCADE'
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
    nombreImagen: {
      type: DataTypes.STRING,
      allowNull: true // Nuevo campo para el nombre de la imagen
    },
    responsableId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ubicacionId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Activos',
  });
  return Activos;
};
