import express from 'express';

import {
  createInventario,
  getInventario,
  getInventarios,
  updateInventario,
  deleteInventario,
} from '../controllers/inventarioController.js';

const router = express.Router();

router.get('/', getInventarios);
router.post('/new', createInventario);
router.get('/inventario/:id', getInventario);
router.put('/update/:id', updateInventario);
router.delete('/delete/:id', deleteInventario);

export default router;