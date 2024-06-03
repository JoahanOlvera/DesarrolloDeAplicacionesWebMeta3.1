'use strict';

const fs = require('fs');
const path = require('path');

// Leer el archivo de imagen y convertirlo a base64
const imagePath = path.resolve(__dirname, '../did-some-logo-banner-for-everyone-11-20-v0-jr93sp9bh9tc1.png'); // Ruta a tu imagen
const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ubicaciones', [
      {
        descripcion: 'Laboratorio computacion',
        imagen: Buffer.from(imageBase64, 'base64'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'Laboratorio mecatronica',
        imagen: Buffer.from(imageBase64, 'base64'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Agrega más activos aquí
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ubicaciones', null, {});
  }
};