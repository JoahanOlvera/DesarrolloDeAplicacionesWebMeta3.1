//import {sequelize} from "..database.js";
import { Responsable } from "../modelosBD/Responsables.js";
import { TagResponsableUbicacion } from "../modelosBD/TagResponsableUbicacion.js"
import express from 'express';
import bodyParser from "body-parser"; 

export const selectResponsables = async(req, res) => {
    try {
      const responsables = await Responsable.findAll();
      await res.json(responsables.map(responsables => responsables.toJSON()));
      //console.log('Responsables encontrados:', responsables.map(responsables => responsables.toJSON()));
    } catch (error) {
      console.error('Error al buscar responsables:', error);
    }
}

export const selectResponsablePorId = async(req, res) => {
    try{
      const{id} = req.params;
      const responsable = await Responsable.findByPk(id);
      if(!responsable){
        console.log("No hay ningun resposable con ese ID");
      } else {
        console.log("Responsable encontrado:", responsable.toJSON());
        res.json(responsable.toJSON());
      }
    } catch (error) {
      console.error('Error al buscar activos:', error);
    }
}

export const deleteResponsableById = async (req, res) => {
    try {
      const {id} = req.params
      const responsable = await Responsable.findByPk(id);
      if (!responsable) {
        console.log('No se encontró ningún activo con ese ID para eliminar.');
      } else {
        await responsable.destroy();
        console.log('responsable eliminado correctamente.');
        res.status(201).send("Eliminado correctamente");
      }
    } catch (error) {
      console.error('Error al eliminar al responsable por ID:', error);
    }
}

export const insertResponsable = async(req, res) => {
    try {
      console.log("Body del req: ", req.body);
      const { id, numeroEmpleado, nombre, idUbicacion, imagen} = req.body;
      const nuevoResponsable = await Responsable.create({
        id: id,
        numeroEmpleado: numeroEmpleado,
        nombre: nombre,
        imagen: imagen
      });
      const nuevaRelacion = await TagResponsableUbicacion.create({
        idUbicacion: idUbicacion,
        idResponsable: id
      });
      await res.status(201).json(nuevoResponsable, nuevaRelacion);
    } catch (error) {
      console.error('Error al buscar responsables:', error);
      res.status(500).json({ error: 'Error al crear activo y tags' });
    }
}

export const updateResponsableById = async (req, res) => {
    try {
      const { id } = req.params;
      const { numeroEmpleado, nombre, imagen } = req.body;
  
      // Verificar si el activo existe
      const responsable = await Responsable.findByPk(id);
      if (!responsable) {
        return res.status(404).json({ error: 'Responsable no encontrado' });
      }
  
      // Actualizar el activo con los nuevos valores
      await responsable.update({
        numeroEmpleado: numeroEmpleado,
        nombre: nombre,
        imagen: imagen
      });
  
      console.log('Responsable actualizado correctamente.');
      res.status(200).json(responsable);
    } catch (error) {
      console.error('Error al actualizar el responsable:', error);
      res.status(500).json({ error: 'Error al actualizar el responsable' });
    }
  };