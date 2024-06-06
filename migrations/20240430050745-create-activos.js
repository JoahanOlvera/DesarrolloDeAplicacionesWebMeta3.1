'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroDeSerie: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      numeroDeInventario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
      },
      tipo: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
      },
      descripcion: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
      },
      imagen: {
        type: Sequelize.BLOB('long'),
        allowNull: true
      },
      responsableId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Permitir valores nulos
        references: {
          model: 'Responsables',
          key: 'id'
        },
        onDelete: 'SET NULL', // Cambiar a SET NULL
        onUpdate: 'CASCADE'
      },
      ubicacionId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Permitir valores nulos
        references: {
          model: 'Ubicaciones',
          key: 'id'
        },
        onDelete: 'SET NULL', // Cambiar a SET NULL
        onUpdate: 'CASCADE'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Activos');
  }
};
