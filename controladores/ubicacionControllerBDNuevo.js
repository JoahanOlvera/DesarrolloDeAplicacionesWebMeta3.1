const { Sequelize } = require('sequelize');
const db = require('../models/index.js'); // Importa el objeto 'db' usando require
const { Activos } = require('../models/index.js');

const sequelize = db.sequelize;
const Ubicaciones = db.Ubicaciones;

const ingresarUbicaciones = async (req, res) => {
  try {
    const { descripcion, imagenBase64 } = req.body;
    if (!imagenBase64) {
      throw new Error('imagenBase64 is undefined');
    }
    const buffer = Buffer.from(imagenBase64, 'base64'); // Convertir base64 a Buffer
    const nuevaUbicacion = await Ubicaciones.create({
      descripcion: descripcion,
      imagen: buffer
    });
    res.status(201).json(nuevaUbicacion);
  } catch (error) {
    console.error('Error al crear ubicaciones:', error);
    res.status(500).json({ error: 'Error al crear ubicacion' });
  }
};



async function obtenerUbicaciones(req, res) {
  try {
    // Obtén todas las ubicaciones
    const ubicaciones = await Ubicaciones.findAll();

    // Itera sobre cada ubicación para obtener sus activos y convertir la imagen a base64
    const resultados = await Promise.all(ubicaciones.map(async (ubicacion) => {
      const activos = await Activos.findAll({
        where: {
          ubicacionId: ubicacion.id,
        },
        attributes: ['id'],
      });

      // Convertir la imagen a base64
      const imagenBase64 = ubicacion.imagen ? ubicacion.imagen.toString('base64') : null;

      return {
        ...ubicacion.toJSON(),
        imagenBase64, // Añadir la imagen en base64
        activos: activos.map(activo => activo.id),
      };
    }));

    // Envía la respuesta JSON con las ubicaciones y sus activos asociados
    res.json(resultados);
  } catch (error) {
    console.error('Error al buscar ubicaciones:', error);
    res.status(500).json({ error: 'Error al buscar ubicaciones' });
  }
}



async function selectUbicacionPorId(req, res) {
  try {
    const { id } = req.params;
    
    // Obtén la ubicación por ID
    const ubicacion = await Ubicaciones.findByPk(id);

    if (!ubicacion) {
      console.log("No hay ninguna ubicación con ese ID");
      return res.status(404).json("No hay ninguna ubicación con ese ID");
    }

    // Obtén los activos de la ubicación
    const activos = await Activos.findAll({
      where: {
        ubicacionId: id,
      },
      attributes: ['id'], // Solo selecciona el campo 'id'
    });

    // Combina la ubicación con sus activos
    const resultado = {
      ...ubicacion.toJSON(),
      activos: activos.map(activo => activo.id), // Devuelve solo el id de cada activo
    };

    console.log("Ubicación y activos encontrados:", resultado);
    res.json(resultado);
  } catch (error) {
    console.error('Error al buscar ubicación:', error);
    res.status(500).json({ error: 'Error al buscar ubicación' });
  }
}


async function deleteUbicacionById (req, res) {
  try {
    const {id} = req.params
    const ubicacion = await Ubicaciones.findByPk(id);
    if (!ubicacion) {
      console.log('No se encontró ningúna ubicacion con ese ID para eliminar.');
      res.status(404).json("No hay ningun id con esa ubicacion");
    } else {
      await ubicacion.destroy();
      console.log('ubicacion eliminada correctamente.');
      res.status(201).send("Eliminado correctamente");
    }
  } catch (error) {
    console.error('Error al eliminar al ubicacion por ID:', error);
  }
}

const updateUbicacionById = async (req, res) => {
  try {
      const { id } = req.params;
      const { descripcion, imagenBase64 } = req.body;

      // Verificar si la ubicacion existe
      const ubicacion = await Ubicaciones.findByPk(id);
      if (!ubicacion) {
          return res.status(404).json({ error: 'Ubicacion no encontrada' });
      }

      const buffer = Buffer.from(imagenBase64, 'base64'); // Convertir base64 a Buffer

      // Actualizar la ubicacion con los nuevos valores
      await ubicacion.update({
          descripcion: descripcion,
          imagen: buffer
      });

      console.log('Ubicacion actualizada correctamente.');
      res.status(200).json(ubicacion);
  } catch (error) {
      console.error('Error al actualizar la ubicacion:', error);
      res.status(500).json({ error: 'Error al actualizar la ubicacion' });
  }
};

module.exports = {ingresarUbicaciones, obtenerUbicaciones, selectUbicacionPorId, deleteUbicacionById, updateUbicacionById}
