import {DataTypes} from "sequelize";
import {sequelize} from "../database.js";

export const Ubicacion = sequelize.define('Ubicacion', {
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});