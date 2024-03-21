// Importación de los módulos necesarios
import express from "express"; // Importa Express para crear la aplicación
import bodyParser from "body-parser"; // Importa bodyParser para analizar los cuerpos de las solicitudes HTTP
import activosRouter from './rutas/activos.js';
import ubicacionesRouter from './rutas/ubicaciones.js';
import responsablesRouter from './rutas/responsables.js';
import { obtenerActivos, obtenerActivosPorId, crearActivo, eliminarActivoPorId, actualizarActivoPorId, parchearActivoPorId } from './controladores/activoController.js';
import { obtenerUbicaciones, crearUbicacion, obtenerUbicacionPorId, eliminarUbicacionPorId, actualizarUbicacionPorId, parchearUbicacionPorId} from "./controladores/ubicacionController.js";
import { obtenerResponsables, crearResponsables, obtenerResponsablePorId, eliminarResponsablePorId, actualizarResponsablePorId, parchearResponsablePorId } from "./controladores/responsableController.js";

// Crea una instancia de la aplicación Express
const app = express();

// Configuración de la aplicación Express
// Define el puerto en el que la aplicación escuchará las solicitudes
app.set("port", 4000);
//Configuramos la ruta desde la que se bifurcara cada uno de los routers
app.use('/activos', activosRouter);
app.use('/ubicaciones', ubicacionesRouter);
app.use('/responsables', responsablesRouter);

// Middlewares
// Usa bodyParser para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Rutas y controladores para los activos
//app.get('/activos', obtenerActivos); // Obtiene todos los activos
//app.post('/activos', crearActivo); // Crea un nuevo activo
//app.get('/activos/buscarPorId/:id', obtenerActivosPorId); // Obtiene un activo por su ID
//app.delete('/activos/eliminarPorId/:id', eliminarActivoPorId); // Elimina un activo por su ID
//app.put('/activos/actualizarPorId/:id', actualizarActivoPorId); // Actualiza un activo por su ID
//app.patch('/activos/parchearPorId/:id', parchearActivoPorId); // Actualiza parcialmente un activo por su ID

// Rutas y controladores para las ubicaciones
//app.get('/ubicaciones', obtenerUbicaciones); // Obtiene todas las ubicaciones
//app.post('/ubicaciones', crearUbicacion); // Crea una nueva ubicación
//app.get('/ubicaciones/buscarPorId/:id', obtenerUbicacionPorId); // Obtiene una ubicación por su ID
//app.delete('/ubicaciones/eliminarPorId/:id', eliminarUbicacionPorId); // Elimina una ubicación por su ID
//app.put('/ubicaciones/actualizarPorId/:id', actualizarUbicacionPorId); // Actualiza una ubicación por su ID
//app.patch('/ubicaciones/parchearPorId/:id', parchearUbicacionPorId); // Actualiza parcialmente una ubicación por su ID

// Rutas y controladores para los responsables
//app.get('/responsables', obtenerResponsables); // Obtiene todos los responsables
//app.get('/responsable/buscarPorId/:id', obtenerResponsablePorId); // Obtiene un responsable por su ID
//app.post('/responsables', crearResponsables); // Crea un nuevo responsable
//app.delete('/responsables/eliminarPorId/:id', eliminarResponsablePorId); // Elimina un responsable por su ID
//app.put('/responsables/actualizarPorId/:id', actualizarResponsablePorId); // Actualiza un responsable por su ID
//app.patch('/responsables/parchearPorId/:id', parchearResponsablePorId); // Actualiza parcialmente un responsable por su ID

// Exporta la aplicación Express para poder usarla en otros archivos
export default app;