//import {sequelize} from "..database.js";
import { Ubicacion } from "../modelosBD/Ubicaciones.js";
import { Tags } from "../modelosBD/Tags.js";
import express from 'express';
import bodyParser from "body-parser"; 

export const selectUbicaciones = async(req, res) => {
    try {
      const ubicaciones = await Ubicacion.findAll();
      await res.json(ubicaciones.map(ubicaciones => ubicaciones.toJSON()));
      //console.log('Responsables encontrados:', responsables.map(responsables => responsables.toJSON()));
    } catch (error) {
      console.error('Error al buscar ubicaciones:', error);
    }
}

export const selectUbicacionPorId = async(req, res) => {
    try{
      const{id} = req.params;
      const ubicacion = await Ubicacion.findByPk(id);
      if(!ubicacion){
        console.log("No hay ninguna ubicacion con ese ID");
        res.status(404).json("No hay ningun id con esa ubicacion");
      } else {
        console.log("Ubicacion encontrada:", ubicacion.toJSON());
        res.json(ubicacion.toJSON());
      }
    } catch (error) {
      console.error('Error al buscar ubicaciones:', error);
    }
}

export const deleteUbicacionById = async (req, res) => {
    try {
      const {id} = req.params
      const ubicacion = await Ubicacion.findByPk(id);
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

export const insertUbicacion = async(req, res) => {
    try {
      console.log("Body del req: ", req.body);
      const { id, descripcion, imagen} = req.body;
      const nuevaUbicacion = await Ubicacion.create({
        id: id,
        descripcion: descripcion,
        imagen: imagen
      });
      await res.status(201).json(nuevaUbicacion);
    } catch (error) {
      console.error('Error al buscar ubicaciones:', error);
      res.status(500).json({ error: 'Error al crear ubicacion' });
    }
};

export const updateUbicacionById = async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion, imagen } = req.body;
  
      // Verificar si el activo existe
      const ubicacion = await Ubicacion.findByPk(id);
      if (!ubicacion) {
        return res.status(404).json({ error: 'Ubicacion no encontrada' });
      }
  
      // Actualizar el activo con los nuevos valores
      await ubicacion.update({
        descripcion: descripcion,
        imagen: imagen
      });
  
      console.log('Ubicacion actualizada correctamente.');
      res.status(200).json(ubicacion);
    } catch (error) {
      console.error('Error al actualizar la ubicacion:', error);
      res.status(500).json({ error: 'Error al actualizar la ubicacion' });
    }
  };