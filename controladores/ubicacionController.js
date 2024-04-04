// Importación del modelo Ubicacion y de LocalStorage desde node-localstorage
import Ubicacion from '../modelos/ubicacionModel.js';
import { LocalStorage } from 'node-localstorage';

// Creación de un almacenamiento local en el directorio './data'
const localStorage = new LocalStorage('./data');

// Obtención de ubicaciones guardadas del almacenamiento local si existen, de lo contrario, inicialización con un array vacío
let ubicacionesGuardadas = JSON.parse(localStorage.getItem('ubicaciones')) || [];

// Función para guardar las ubicaciones en el almacenamiento local
const guardarUbicacionesEnLocalStorage = () => {
    localStorage.setItem('ubicaciones', JSON.stringify(ubicacionesGuardadas));
}

// Obtener todas las ubicaciones
export const obtenerUbicaciones = async (req, res) => {
    if(ubicacionesGuardadas){
        await res.json(ubicacionesGuardadas);
    } else {
        await res.status(404).json({message: "Ubicaciones no encontradas"});
    }
}

// Obtener una ubicación por su ID
export const obtenerUbicacionPorId = async (req, res) => {
    const identificador = parseInt(req.params.id);
    const ubicacion = ubicacionesGuardadas.find(u => parseInt(u.id) === identificador);
    if (ubicacion) {
        await res.json(ubicacion);
    } else {
        await res.status(404).json({ message: "Ubicación no encontrada" });
    }
}

// Crear una nueva ubicación
export const crearUbicacion = async (req, res) => {
    const { id, descripcion, activosAsociadosId, imagen } = req.body;
    // Comprobar si la ubicación ya existe
    const ubicacionExistente = ubicacionesGuardadas.find(u => parseInt(u.id) === parseInt(id));
    console.log(ubicacionExistente);
    if (ubicacionExistente) {
        return await res.status(400).json({ message: "La ubicación ya existe" });
    }

    // Crear una nueva instancia de Ubicacion
    const nuevaUbicacion = new Ubicacion(parseInt(id), descripcion, activosAsociadosId, imagen);

    // Agregar la nueva ubicación a la lista y guardar en el almacenamiento local
    ubicacionesGuardadas.push(nuevaUbicacion);
    guardarUbicacionesEnLocalStorage();

    // Enviar respuesta con la nueva ubicación creada
    await res.status(201).json(nuevaUbicacion);
}

// Eliminar una ubicación por su ID
export const eliminarUbicacionPorId = async (req, res) => {
    const { id } = req.params;
    const index = ubicacionesGuardadas.findIndex(ubicacion => parseInt(ubicacion.id) === parseInt(id));
    if (index !== -1) {
        ubicacionesGuardadas.splice(index, 1);
        guardarUbicacionesEnLocalStorage();
        await res.status(200).json({ message: "Ubicación eliminada exitosamente" });
    } else {
        await res.status(404).json({ message: "Ubicación no encontrada" });
    }
}

// Actualizar una ubicación por su ID
export const actualizarUbicacionPorId = async (req, res) => {
    const { id } = req.params;
    const { descripcion, activosAsociadosId, imagen } = req.body;
    console.log(req.params);
    console.log(descripcion, activosAsociadosId, imagen);
    const ubicacionExistente = ubicacionesGuardadas.find(ubicacion => parseInt(ubicacion.id) === parseInt(id));
    if(ubicacionExistente){
        console.log("La ubicacion existe");
        ubicacionExistente.descripcion = descripcion;
        ubicacionExistente.activosAsociadosId = activosAsociadosId;
        ubicacionExistente.imagen = imagen;
        guardarUbicacionesEnLocalStorage(); 
        await res.status(200).json(ubicacionExistente); 
    } else {
        await res.status(404).json({ message: "Ubicación no encontrada" });
    }
}

// Parchear una ubicación por su ID (actualizar parcialmente)
export const parchearUbicacionPorId = async (req, res) => {
    const { id } = req.params;
    const camposActualizados = req.body;

    const ubicacionExistente = ubicacionesGuardadas.find(ubicacion => parseInt(ubicacion.id) === parseInt(id));

    if(ubicacionExistente) {
        Object.keys(camposActualizados).forEach(key => {
            if (key in ubicacionExistente) {
                ubicacionExistente[key] = camposActualizados[key];
            }
        });
        guardarUbicacionesEnLocalStorage();
        await res.status(200).json(ubicacionExistente);
    } else {
        await res.status(400).json({message: "Ubicación no encontrada"});
    }
}