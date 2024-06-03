const { Sequelize } = require('sequelize');
const db = require('../models/index.js'); // Importa el objeto 'db' usando require
const { Activos } = require('../models/index.js');

const sequelize = db.sequelize;
const Responsables = db.Responsables;

async function selectResponsables(req, res) {
  try {
    const responsables = await Responsables.findAll();

    const resultados = await Promise.all(responsables.map(async (responsable) => {
      const activos = await Activos.findAll({
        where: {
          responsableId: responsable.id,
        },
        attributes: ['id'],
      });

      const imagenBase64 = responsable.imagen ? responsable.imagen.toString('base64') : null;

      return {
        ...responsable.toJSON(),
        imagenBase64,
        activos: activos.map(activo => activo.id),
      };
    }));

    res.json(resultados);
  } catch (error) {
    console.error('Error al buscar responsables:', error);
    res.status(500).json({ error: 'Error al buscar responsables' });
  }
}

async function selectResponsablePorId(req, res) {
  try {
    const { id } = req.params;

    const responsable = await Responsables.findByPk(id);
    if (!responsable) {
      return res.status(404).json({ error: 'No se encontró responsable con ese ID' });
    }

    const activos = await Activos.findAll({
      where: {
        responsableId: id,
      },
      attributes: ['id'],
    });

    const imagenBase64 = responsable.imagen ? responsable.imagen.toString('base64') : null;

    const resultado = {
      ...responsable.toJSON(),
      imagenBase64,
      activos: activos.map(activo => activo.id),
    };

    res.json(resultado);
  } catch (error) {
    console.error('Error al buscar responsable:', error);
    res.status(500).json({ error: 'Error al buscar responsable' });
  }
}

async function insertResponsable(req, res) {
  try {
    const { numeroEmpleado, nombre, imagenBase64 } = req.body;
    if (!imagenBase64) {
      throw new Error('imagenBase64 is undefined');
    }
    const buffer = Buffer.from(imagenBase64, 'base64');

    const nuevoResponsable = await Responsables.create({
      numeroEmpleado,
      nombre,
      imagen: buffer
    });
    res.status(201).json(nuevoResponsable);
  } catch (error) {
    console.error('Error al crear responsable:', error);
    res.status(500).json({ error: 'Error al crear responsable' });
  }
}

async function deleteResponsableById(req, res) {
  try {
    const { id } = req.params;
    const responsable = await Responsables.findByPk(id);
    if (!responsable) {
      return res.status(404).json("No se encontró ningún responsable con ese ID para eliminar.");
    }
    await responsable.destroy();
    res.status(201).send("Eliminado correctamente");
  } catch (error) {
    console.error('Error al eliminar al responsable por ID:', error);
    res.status(500).json({ error: 'Error al eliminar responsable' });
  }
}

async function updateResponsableById(req, res) {
  try {
    const { id } = req.params;
    const { numeroEmpleado, nombre, imagenBase64 } = req.body;
    if (!imagenBase64) {
      throw new Error('imagenBase64 is undefined');
    }
    const buffer = Buffer.from(imagenBase64, 'base64');

    const responsable = await Responsables.findByPk(id);
    if (!responsable) {
      return res.status(404).json({ error: 'Responsable no encontrado' });
    }

    await responsable.update({
      numeroEmpleado,
      nombre,
      imagen: buffer
    });

    res.status(200).json(responsable);
  } catch (error) {
    console.error('Error al actualizar el responsable:', error);
    res.status(500).json({ error: 'Error al actualizar el responsable' });
  }
}

module.exports = { selectResponsables, selectResponsablePorId, insertResponsable, deleteResponsableById, updateResponsableById }
