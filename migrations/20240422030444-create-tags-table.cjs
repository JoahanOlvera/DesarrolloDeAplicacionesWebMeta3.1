'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ActivoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Activos', // Nombre del modelo Sequelize para la tabla de activos
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    ResponsableId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Responsables', // Nombre del modelo Sequelize para la tabla de responsables
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    UbicacionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Ubicacions', // Nombre del modelo Sequelize para la tabla de ubicaciones
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tags');
  }
};