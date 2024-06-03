const express = require ('express');
const bodyParser = require ('body-parser'); 
//import { deleteUbicacionById, insertUbicacion, selectUbicacionPorId, selectUbicaciones, updateUbicacionById } from "../controladores/ubicacionControllerBD.js";
const { ingresarUbicaciones, obtenerUbicaciones, selectUbicacionPorId, updateUbicacionById, deleteUbicacionById } = require('../controladores/ubicacionControllerBDNuevo.js');

const ubicacionesRouterBD = express.Router();
ubicacionesRouterBD.use(bodyParser.json());

ubicacionesRouterBD.get('/', (req, res) => {
    obtenerUbicaciones(req, res);
});

ubicacionesRouterBD.post('/', (req, res) => {
    ingresarUbicaciones(req, res);
});

ubicacionesRouterBD.get('/buscarPorId/:id', (req, res) => {
    selectUbicacionPorId(req, res);
});

ubicacionesRouterBD.delete('/eliminarPorId/:id', (req, res) => {
    deleteUbicacionById(req, res);
});

ubicacionesRouterBD.put('/actualizarPorId/:id', (req, res) => {
    updateUbicacionById(req, res);
});
/*

*/
//export default router;
module.exports = ubicacionesRouterBD
