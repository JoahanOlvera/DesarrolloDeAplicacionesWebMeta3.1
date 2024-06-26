import {DataTypes} from "sequelize";
import {sequelize} from "../database.js";
import { Ubicacion } from "./Ubicaciones.js";
import { TagResponsableUbicacion } from "./TagResponsableUbicacion.js";

export const Responsable = sequelize.define('Responsable', {
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
    },
    numeroEmpleado: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: false,
    },
    nombre: {
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

Responsable.belongsToMany(Ubicacion, { through: TagResponsableUbicacion, foreignKey: 'id' });
