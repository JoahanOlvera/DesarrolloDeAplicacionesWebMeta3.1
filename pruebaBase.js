const { Sequelize } = require('sequelize');
const db = require('./models/index.js'); // Importa el objeto 'db' usando require

const sequelize = db.sequelize;
const Ubicaciones = db.Ubicaciones;

async function ingresarUbicaciones() {
  try {
    const nuevaUbicacion = await Ubicaciones.create({
      descripcion: "Nueva descripcion",
      imagen: "nuevaImagen.jpg"
    });
    //console.log(nuevaUbicacion);
    //await res.status(201).json(nuevaUbicacion);
  } catch (error) {
    console.error('Error al crear ubicaciones:', error);
    //res.status(500).json({ error: 'Error al crear ubicacion' });
  }
}

async function obtenerUbicaciones() {
  try {
    const ubicaciones = await Ubicaciones.findAll();
    console.log(JSON.stringify(ubicaciones, null, 2)); // Agrega JSON.stringify para formatear la salida
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
  }
}

//ingresarUbicaciones();
obtenerUbicaciones();
