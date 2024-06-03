'use strict';

const fs = require('fs');
const path = require('path');

// Leer el archivo de imagen y convertirlo a base64
const imagePath = path.resolve(__dirname, '../did-some-logo-banner-for-everyone-11-20-v0-jr93sp9bh9tc1.png'); // Ruta a tu imagen
const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activos', [
      {
        numeroDeSerie: '123456',
        numeroDeInventario: 9,
        tipo: 'Computer',
        descripcion: 'Dell Latitude 5500',
        imagen: Buffer.from(imageBase64, 'base64'),
        responsableId: 4,
        ubicacionId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroDeSerie: '789012',
        numeroDeInventario: 8,
        tipo: 'Monitor',
        descripcion: 'Samsung 24 inch',
        imagen: Buffer.from(imageBase64, 'base64'), // Puedes usar la misma imagen para todos los registros o diferentes
        responsableId: 3,
        ubicacionId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Agrega más activos aquí
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Activos', null, {});
  }
};
