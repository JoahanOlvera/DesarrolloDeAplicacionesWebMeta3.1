import express from 'express';
import bodyParser from "body-parser"; 
import { selectActivos, selectActivoPorId ,insertActivos, deleteActivoById, updateActivoById } from "../controladores/activosControllerBD.js";

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
   selectActivos(req, res);
});

router.get('/buscarPorId/:id', (req, res) => {
    selectActivoPorId(req, res);
});

router.delete('/eliminarPorId/:id', (req, res) => {
    deleteActivoById(req, res);
});

router.post('/', (req, res) => {
    insertActivos(req, res);
});

router.put('/actualizarPorId/:id', (req, res) => {
    updateActivoById(req, res);
});

export default router;