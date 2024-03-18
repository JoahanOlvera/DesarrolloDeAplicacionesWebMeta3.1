/// Importación del modelo Activo y de LocalStorage desde node-localstorage
import Activo from '../modelos/activoModel.js';
import { LocalStorage } from 'node-localstorage';

// Creación de un almacenamiento local en el directorio './data'
const localStorage = new LocalStorage('./data');

// Obtención de activos guardados del almacenamiento local si existen, de lo contrario, inicialización con un array vacío
let activosGuardados = JSON.parse(localStorage.getItem('activos')) || [];

// Función para guardar los activos en el almacenamiento local
const guardarActivosEnLocalStorage = () => {
    localStorage.setItem('activos', JSON.stringify(activosGuardados));
}

// Obtener todos los activos
export const obtenerActivos = async (req, res) => {
    if(activosGuardados){
        await res.json(activosGuardados);
    } else {
        await res.status(404).json({message: "Activos no encontradas"});
    }
}

// Obtener un activo por su ID
export const obtenerActivosPorId = async (req, res) => {
    const { id } = req.params;
    // Sacamos el activo cuyo id coincida con el parametro que el usuario coloco
    const activo = activosGuardados.find(activo => activo.id === parseInt(id));
    if (activo) {
        await res.json(activo);
    } else {
        await res.status(404).send("Activo no encontrado");
    }
}

// Crear un nuevo activo usando los parametros que se mandaron a través del body del req, en caso de que el id
//ya exista se indica fallo, de no ser así se crea un nuevo activo y se agrega a la lista
export const crearActivo = async (req, res) => {
    const { id, numeroSerie, numeroInventario, tipo, descripcion, ubicacionId, responsableId, imagen } = req.body;
    const activoExistente = activosGuardados.find(u => u.id === id);
    if (activoExistente) {
        return res.status(400).json({ message: "El activo ya existe" });
    }
    const nuevoActivo = new Activo(
        id,
        numeroSerie,
        numeroInventario,
        tipo,
        descripcion,
        ubicacionId,
        responsableId,
        imagen
    );
    console.log(nuevoActivo);
    activosGuardados.push(nuevoActivo);
    guardarActivosEnLocalStorage();
    await res.status(201).json(nuevoActivo);
}

// Eliminar un activo por su ID, en caso de no se encuentre ningún activo con ese id se indica error, si se encuentra
// uno se borra de la lista y se actualiza esta.
export const eliminarActivoPorId = async (req, res) => {
    const { id } = req.params;
    const index = activosGuardados.findIndex(activo => activo.id === parseInt(id));
    if (index !== -1) {
        activosGuardados.splice(index, 1);
        guardarActivosEnLocalStorage();
        await res.status(200).json({ message: "Activo eliminado exitosamente" });
    } else {
        await res.status(404).json({ message: "Activo no encontrado" });
    }
}

// Actualizar un activo por su ID, reemplazando todos sus elementos por los que se indicaron en el body de la 
// peticion
export const actualizarActivoPorId = async (req, res) => {
    const { id } = req.params;
    const {numeroSerie, numeroInventario, tipo, descripcion, ubicacionId, responsableId, imagen } = req.body;        
    const activoExistente = activosGuardados.find(activo => activo.id === parseInt(id));
    if(activoExistente){
        activoExistente.numeroSerie = numeroSerie;
        activoExistente.numeroInventario = numeroInventario;
        activoExistente.tipo = tipo;
        activoExistente.descripcion = descripcion;
        activoExistente.ubicacionId = ubicacionId;
        activoExistente.responsableId = responsableId;
        activoExistente.imagen = imagen;
        guardarActivosEnLocalStorage();
        await res.status(200).json(activoExistente);
    } else {
        await res.status(404).json({ message: "Activo no encontrado" });
    }
}

// Parchear un activo por su ID (actualizar parcialmente), se reciben los parametros que se quieren cambiar y
// se recorre cada campo del activo que se quiere cambiar, si en el body se encuentra alguno de los campos
// del activo se cambia el contenido por el nuevo
export const parchearActivoPorId = async (req, res) => {
    const { id } = req.params;
    const camposActualizados = req.body;

    const activoExistente = activosGuardados.find(activo => activo.id === parseInt(id));

    if(activoExistente) {
        Object.keys(camposActualizados).forEach(key => {
            if (key in activoExistente) {
                activoExistente[key] = camposActualizados[key];
            }
        });

        guardarActivosEnLocalStorage();
        await res.status(200).json(activoExistente);
    } else {
        await res.status(400).json({message: "Activo no encontrado"});
    }
}
