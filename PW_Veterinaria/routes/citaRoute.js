import express from 'express';

import {
  createCita,
  getCita,
  getCitas,
  updateCita,
  deleteCita,
} from '../controllers/citaController.js';

const router = express.Router();

router.get('/', getCitas);
router.post('/new', createCita);
router.get('/cita/:id', getCita);
router.put('/update/:id', updateCita);
router.delete('/delete/:id', deleteCita);

export default router;