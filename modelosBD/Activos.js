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
    imagen: {
        type: DataTypes.STRING, 
        allowNull: false,
        primaryKey: false,
    }
});