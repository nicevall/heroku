import express from 'express';

import {
  createCliente,
  getCliente,
  getClientes,
  updateCliente,
  deleteCliente,
} from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', getClientes);
router.post('/new', createCliente);
router.get('/cliente/:id', getCliente);
router.put('/update/:id', updateCliente);
router.delete('/delete/:id', deleteCliente);

export default router;