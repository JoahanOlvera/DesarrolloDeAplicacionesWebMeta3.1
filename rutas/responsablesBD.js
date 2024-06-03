const express = require ('express');
const bodyParser = require ('body-parser'); 
const { selectResponsables, selectResponsablePorId, insertResponsable, deleteResponsableById, updateResponsableById} = require("../controladores/responsableControllerBDNuevo.js");

const responsablesRouterBD = express.Router();
responsablesRouterBD.use(bodyParser.json());

responsablesRouterBD.get('/', (req, res) => {
   selectResponsables(req, res);
});

responsablesRouterBD.get('/buscarPorId/:id', (req, res) => {
    selectResponsablePorId(req, res);
});

responsablesRouterBD.post('/', (req, res) => {
    insertResponsable(req, res);
});

responsablesRouterBD.delete('/eliminarPorId/:id', (req, res) => {
    deleteResponsableById(req, res);
});

responsablesRouterBD.put('/actualizarPorId/:id', (req, res) => {
    updateResponsableById(req, res);
});

module.exports = responsablesRouterBD
