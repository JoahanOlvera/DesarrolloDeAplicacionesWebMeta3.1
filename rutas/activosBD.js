const express = require ('express');
const bodyParser = require ('body-parser');
const {selectActivos, selectActivoPorId, insertActivo, deleteActivoById, updateActivoById} = require ("../controladores/activosControllerBDNuevo.js"); 
//import { selectActivos, selectActivoPorId ,insertActivos, deleteActivoById, updateActivoById } from "../controladores/activosControllerBD.js";

const activoRouterBD = express.Router();
activoRouterBD.use(bodyParser.json());

activoRouterBD.get('/', (req, res) => {
   selectActivos(req, res);
});

activoRouterBD.get('/buscarPorId/:id', (req, res) => {
    selectActivoPorId(req, res);
});

activoRouterBD.delete('/eliminarPorId/:id', (req, res) => {
    deleteActivoById(req, res);
});

activoRouterBD.post('/', (req, res) => {
    insertActivo(req, res);
});

activoRouterBD.put('/actualizarPorId/:id', (req, res) => {
    updateActivoById(req, res);
});

module.exports = activoRouterBD