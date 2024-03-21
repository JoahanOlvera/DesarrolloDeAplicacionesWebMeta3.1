import express from 'express';
import bodyParser from "body-parser"; 
import { obtenerActivos, obtenerActivosPorId, crearActivo, eliminarActivoPorId, actualizarActivoPorId, parchearActivoPorId } from '../controladores/activoController.js';

//Creamos el router para que procese las rutas que enviemos para las diferentes peticiones
const router = express.Router();
router.use(bodyParser.json());

//Los métodos asociados al router tendrán cada uno un método REST y una ruta definida, que recibira un request y dara un respuesta
//pero en este caso como exportamos los métodos enviamos el req y el res al método de forma directa
router.get('/', (req, res) => {
    obtenerActivos(req, res);
});

router.get('/buscarPorId/:id', (req, res) => {
    obtenerActivosPorId(req, res);
})

router.delete('/eliminarPorId/:id', (req, res) => {
    eliminarActivoPorId(req, res);
})

router.post('/', (req, res) => {
    crearActivo(req, res);
})

router.put('/actualizarPorId/:id', (req, res) => {
    actualizarActivoPorId(req, res);
})

router.patch('/parchearPorId/:id', (req, res) => {
    parchearActivoPorId(req, res);
})

export default router;