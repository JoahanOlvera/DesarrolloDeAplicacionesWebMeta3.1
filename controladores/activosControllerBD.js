//import {sequelize} from "..database.js";
import { Activo } from "../modelosBD/Activos.js";
import { Tags } from "../modelosBD/Tags.js";
import express from 'express';
import bodyParser from "body-parser"; 

export const selectActivos = async(req, res) => {
    try {
      const activos = await Activo.findAll();
      await res.json(activos.map(activos => activos.toJSON()));
      //console.log('Responsables encontrados:', responsables.map(responsables => responsables.toJSON()));
    } catch (error) {
      console.error('Error al buscar activos:', error);
    }
}

export const selectActivoPorId = async(req, res) => {
  try{
    const{id} = req.params;
    const activo = await Activo.findByPk(id);
    if(!activo){
      console.log("No hay ningun activo con ese ID");
    } else {
      console.log("Activo encontrado:", activo.toJSON());
      res.json(activo.toJSON());
    }
  } catch (error) {
    console.error('Error al buscar activos:', error);
  }
}

export const insertActivos = async(req, res) => {
  try {
    console.log("Body del req: ", req.body);
    const { id, numeroSerie, numeroInventario, tipoActivo, descripcion, imagen, ubicacionesIds, responsablesIds } = req.body;
    const nuevoActivo = await Activo.create({
      id: id,
      numeroSerie: numeroSerie,
      numeroInventario: numeroInventario,
      tipoActivo: tipoActivo,
      descripcion: descripcion,
      imagen: imagen
    });
    console.log(responsablesIds);
    console.log(ubicacionesIds);
    // Crear registros de tags para cada combinación de activo-responsable-ubicación
    if (ubicacionesIds && responsablesIds) {
      for (const ubicacionId of ubicacionesIds) {
        for (const responsableId of responsablesIds) {
          await Tags.create({
            ActivoId: nuevoActivo.id,
            ResponsableId: responsableId,
            UbicacionId: ubicacionId,
          });
        }
      }
    }

    await res.status(201).json(nuevoActivo);
  } catch (error) {
    console.error('Error al buscar responsables:', error);
    res.status(500).json({ error: 'Error al crear activo y tags' });
  }
}


export const deleteActivoById = async (req, res) => {
  try {
    const {id} = req.params
    const activo = await Activo.findByPk(id);
    if (!activo) {
      console.log('No se encontró ningún activo con ese ID para eliminar.');
    } else {
      await activo.destroy();
      console.log('activo eliminado correctamente.');
      res.status(201).send("Eliminado correctamente");
    }
  } catch (error) {
    console.error('Error al eliminar al responsable por ID:', error);
  }
}

export const updateActivoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { numeroSerie, numeroInventario, tipoActivo, descripcion, imagen } = req.body;

    // Verificar si el activo existe
    const activo = await Activo.findByPk(id);
    if (!activo) {
      return res.status(404).json({ error: 'Activo no encontrado' });
    }

    // Actualizar el activo con los nuevos valores
    await activo.update({
      numeroSerie: numeroSerie,
      numeroInventario: numeroInventario,
      tipoActivo: tipoActivo,
      descripcion: descripcion,
      imagen: imagen
    });

    console.log('Activo actualizado correctamente.');
    res.status(200).json(activo);
  } catch (error) {
    console.error('Error al actualizar el activo:', error);
    res.status(500).json({ error: 'Error al actualizar el activo' });
  }
};
