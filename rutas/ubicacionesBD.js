import express from 'express';
import bodyParser from "body-parser"; 
import { deleteUbicacionById, insertUbicacion, selectUbicacionPorId, selectUbicaciones, updateUbicacionById } from "../controladores/ubicacionControllerBD.js";

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
   selectUbicaciones(req, res);
});

router.get('/buscarPorId/:id', (req, res) => {
    selectUbicacionPorId(req, res);
});

router.delete('/eliminarPorId/:id', (req, res) => {
    deleteUbicacionById(req, res);
});

router.post('/', (req, res) => {
    insertUbicacion(req, res);
});

router.put('/actualizarPorId/:id', (req, res) => {
    updateUbicacionById(req, res);
});

export default router;