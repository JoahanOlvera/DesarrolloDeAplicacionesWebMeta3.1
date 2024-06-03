import { DataTypes } from "sequelize";
import { sequelize } from "../database.js"; // Importa la instancia de Sequelize

export const TagResponsableUbicacion = sequelize.define('TagsRU', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idUbicacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Ubicaciones', // Nombre del modelo de Ubicacion
            key: 'id' // Nombre de la clave primaria en el modelo de Ubicacion
        }
    },
    idResponsable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Responsables', // Nombre del modelo de Responsable
            key: 'id' // Nombre de la clave primaria en el modelo de Responsable
        }
    }
});