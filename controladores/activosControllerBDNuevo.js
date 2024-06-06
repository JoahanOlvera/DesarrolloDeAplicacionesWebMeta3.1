const { Sequelize } = require('sequelize');
const db = require('../models/index.js'); // Importa el objeto 'db' usando require

const sequelize = db.sequelize;
const Activos = db.Activos;

async function selectActivos(req, res) {
  try {
    const activos = await Activos.findAll();
    const resultados = activos.map(activo => {
      const imagenBase64 = activo.imagen ? activo.imagen.toString('base64') : null;
      return {
        ...activo.toJSON(),
        imagenBase64
      };
    });
    res.json(resultados);
  } catch (error) {
    console.error('Error al buscar activos:', error);
    res.status(500).json({ error: 'Error al buscar activos' });
  }
}

async function selectActivoPorId(req, res) {
  try {
    const { id } = req.params;
    const activo = await Activos.findByPk(id);
    if (!activo) {
      return res.status(404).json({ error: 'No hay ningun activo con ese ID' });
    }
    const imagenBase64 = activo.imagen ? activo.imagen.toString('base64') : null;
    res.json({ ...activo.toJSON(), imagenBase64 });
  } catch (error) {
    console.error('Error al buscar activo:', error);
    res.status(500).json({ error: 'Error al buscar activo' });
  }
}

async function insertActivo(req, res) {
  try {
    const { numeroSerie, numeroInventario, tipo, descripcion, imagenBase64, responsableId, ubicacionId } = req.body;
    if (!imagenBase64) {
      throw new Error('imagenBase64 is undefined');
    }
    const buffer = Buffer.from(imagenBase64, 'base64');
    const nuevoActivo = await Activos.create({
      numeroDeSerie: numeroSerie,
      numeroDeInventario: numeroInventario,
      tipo,
      descripcion,
      imagen: buffer,
      responsableId,
      ubicacionId
    });
    res.status(201).json(nuevoActivo);
  } catch (error) {
    console.error('Error al crear activo:', error);
    res.status(500).json({ error: 'Error al crear activo' });
  }
}

async function deleteActivoById(req, res) {
  try {
    const { id } = req.params;
    const activo = await Activos.findByPk(id);
    if (!activo) {
      return res.status(404).json({ error: 'Activo no encontrado' });
    }
    await activo.destroy();
    res.status(201).send("Eliminado correctamente");
  } catch (error) {
    console.error('Error al eliminar al activo por ID:', error);
    res.status(500).json({ error: 'Error al eliminar activo' });
  }
}

async function updateActivoById(req, res) {
  try {
    const { id } = req.params;
    const { numeroSerie, numeroInventario, tipo, descripcion, imagenBase64, responsableId, ubicacionId } = req.body;
    if (!imagenBase64) {
      throw new Error('imagenBase64 is undefined');
    }
    const buffer = Buffer.from(imagenBase64, 'base64');

    const activo = await Activos.findByPk(id);
    if (!activo) {
      return res.status(404).json({ error: 'Activo no encontrado' });
    }

    await activo.update({
      numeroDeSerie: numeroSerie,
      numeroDeInventario: numeroInventario,
      tipo,
      descripcion,
      imagen: buffer,
      responsableId,
      ubicacionId
    });

    res.status(200).json(activo);
  } catch (error) {
    console.error('Error al actualizar el activo:', error);
    res.status(500).json({ error: 'Error al actualizar el activo' });
  }
}

module.exports = { selectActivos, selectActivoPorId, insertActivo, deleteActivoById, updateActivoById }