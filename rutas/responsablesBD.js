import express from 'express';
import bodyParser from "body-parser"; 
import { selectResponsables, selectResponsablePorId, deleteResponsableById, insertResponsable, updateResponsableById } from "../controladores/responsableControllerBD.js";

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
   selectResponsables(req, res);
});

router.get('/buscarPorId/:id', (req, res) => {
    selectResponsablePorId(req, res);
});

router.delete('/eliminarPorId/:id', (req, res) => {
    deleteResponsableById(req, res);
});

router.post('/', (req, res) => {
    insertResponsable(req, res);
});

router.put('/actualizarPorId/:id', (req, res) => {
    updateResponsableById(req, res);
});

export default router;