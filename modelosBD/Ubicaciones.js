import {DataTypes} from "sequelize";
import {sequelize} from "../database.js";
import { Responsable } from "./Responsables.js";
import { TagResponsableUbicacion } from "./TagResponsableUbicacion.js";

export const Ubicacion = sequelize.define('Ubicaciones', {
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

//Ubicacion.hasMany(Responsable, { through: TagResponsableUbicacion, foreignKey: 'id' });