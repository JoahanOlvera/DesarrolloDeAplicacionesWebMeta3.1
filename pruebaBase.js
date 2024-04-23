import {sequelize} from "./database.js";
import { Ubicacion } from "./modelosBD/Ubicaciones.js";
import { Responsable } from "./modelosBD/Responsables.js";
import { Activo } from "./modelosBD/Activos.js";

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

async function insertUbicacion() {
    try {
      const nuevaUbicacion = await Ubicacion.create({
        id: 3,
        descripcion: "Ubicación de prueba",
        imagen: "ruta/imagen.jpg",
      });
  
      console.log('Ubicación creada:', nuevaUbicacion.toJSON());
    } catch (error) {
      console.error('Error al crear la ubicación:', error);
    }
  }

  async function insertResponsable(){
    try {
      const nuevoResponsable = await Responsable.create({
        id: 1,
        numeroEmpleado: 1,
        nombre: "Pepe",
        imagen: "ruta/imagen.jpg",
      });
  
      console.log('Responsable creado:', nuevoResponsable.toJSON());
    } catch (error) {
      console.error('Error al crear al responsable:', error);
    }
  }
  
  async function selectResponsables() {
    try {
      const responsables = await Responsable.findAll();
      console.log('Responsables encontrados:', responsables.map(responsables => responsables.toJSON()));
    } catch (error) {
      console.error('Error al buscar responsables:', error);
    }
  }


  async function selectUbicaciones() {
    try {
      const ubicaciones = await Ubicacion.findAll();
      console.log('Ubicaciones encontradas:', ubicaciones.map(ubicacion => ubicacion.toJSON()));
    } catch (error) {
      console.error('Error al buscar ubicaciones:', error);
    }
  }

syncDatabase();
//insertUbicacion();  
selectUbicaciones();
//insertResponsable();
selectResponsables();