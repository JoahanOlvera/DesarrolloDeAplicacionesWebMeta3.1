import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Tags = sequelize.define('Tags', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ActivoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Activos', // Nombre del modelo Sequelize para la tabla de activos
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  ResponsableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UbicacionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
