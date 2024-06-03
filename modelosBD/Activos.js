import {DataTypes} from "sequelize";
import {sequelize} from "../database.js";

export const Activo = sequelize.define('Activo', {
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
    },
    numeroSerie: {
        type: DataTypes.STRING, 
        allowNull: false,
        primaryKey: false,
    },
    numeroInventario: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: false,
    },
    tipoActivo: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    },
    idUbicacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'ubicaciones', // Nombre de la tabla de Ubicaciones
        key: 'id'
        }
    },
    idResponsable: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'responsables', // Nombre de la tabla de Responsables
      key: 'id'
    }
    },
    imagen: {
        type: DataTypes.STRING, 
        allowNull: false,
        primaryKey: false,
    }
});