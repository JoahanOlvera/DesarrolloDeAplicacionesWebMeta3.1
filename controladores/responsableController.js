// Importación del modelo Responsable y de LocalStorage desde node-localstorage
import Responsable from '../modelos/responsableModel.js';
import { LocalStorage } from 'node-localstorage';

// Creación de un almacenamiento local en el directorio './data'
const localStorage = new LocalStorage('./data');

// Obtención de responsables guardados del almacenamiento local si existen, de lo contrario, inicialización con un array vacío
let responsablesGuardados = JSON.parse(localStorage.getItem('responsables')) || [];

// Función para guardar los responsables en el almacenamiento local
const guardarResponsablesEnLocalStorage = () => {
    localStorage.setItem('responsables', JSON.stringify(responsablesGuardados));
}

// Obtener todos los responsables
export const obtenerResponsables = async (req, res) => {
    if(responsablesGuardados){
        await res.json(responsablesGuardados);
    } else {
        await res.status(404).json({message: "Responsables no encontradas"});
    }
}

// Obtener un responsable por su ID
export const obtenerResponsablePorId = async (req, res) => {
    const { id } = req.params;
    const responsable = responsablesGuardados.find(responsable => responsable.id === parseInt(id));
    if (responsable) {
        await res.json(responsable);
    } else {
        await res.status(404).send("Responsable no encontrado");
    }
}

// Eliminar un responsable por su ID
export const eliminarResponsablePorId = async (req, res) => {
    const { id } = req.params;
    const index = responsablesGuardados.findIndex(responsable => responsable.id === parseInt(id));
    if (index !== -1) {
        responsablesGuardados.splice(index, 1); 
        guardarResponsablesEnLocalStorage(); 
        await res.status(200).json({ message: "Responsable eliminado exitosamente" });
    } else {
        await res.status(404).json({ message: "Responsable no encontrado" });
    }
}

// Crear un nuevo responsable
export const crearResponsables = async (req, res) => {
    const { id, numeroEmpleado, nombre, activosCustodiados, imagen } = req.body;
    const responsableExistente = responsablesGuardados.find(u => parseInt(u.id) === parseInt(id));
    if (responsableExistente) {
        return res.status(400).json({ message: "El responsable ya existe" });
    }
    const nuevoResponsable = new Responsable(parseInt(id), parseInt(numeroEmpleado), nombre, activosCustodiados, imagen);
    responsablesGuardados.push(nuevoResponsable);
    guardarResponsablesEnLocalStorage();
    await res.status(201).json(nuevoResponsable);
}

// Actualizar un responsable por su ID
export const actualizarResponsablePorId = async (req, res) => {
    const { id } = req.params;
    const {numeroEmpleado, nombre, activosCustodiados, imagen } = req.body;        
    const responsableExistente = responsablesGuardados.find(responsable => parseInt(responsable.id) === parseInt(id));
    if(responsableExistente){
        responsableExistente.numeroEmpleado = parseInt(numeroEmpleado);
        responsableExistente.nombre = nombre;
        responsableExistente.activosCustodiados = activosCustodiados;
        responsableExistente.imagen = imagen;
        guardarResponsablesEnLocalStorage();
        await res.status(200).json(responsableExistente);
    } else {
        await res.status(404).json({ message: "Responsable no encontrado" });
    }
}

// Parchear un responsable por su ID (actualizar parcialmente)
export const parchearResponsablePorId = async (req, res) => {
    const { id } = req.params;
    const camposActualizados = req.body;
    const responsableExistente = responsablesGuardados.find(responsable => parseInt(responsable.id) === parseInt(id));

    if(responsableExistente) {
        Object.keys(camposActualizados).forEach(key => {
            if (key in responsableExistente) {
                responsableExistente[key] = camposActualizados[key];
            }
        });
        guardarResponsablesEnLocalStorage();
        await res.status(200).json(responsableExistente);
    } else {
        await res.status(400).json({message: "Responsable no encontrado"});
    }
}