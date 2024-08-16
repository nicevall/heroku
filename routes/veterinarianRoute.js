import express from 'express';
import {
  createVeterinarian,
  getVeterinarian,
  getVeterinarians,
  updateVeterinarian,
  deleteVeterinarian,
} from '../controllers/veterinarianController.js';

const router = express.Router();

router.get('/', getVeterinarians);
router.post('/new', createVeterinarian);
router.get('/veterinarian/:id', getVeterinarian);
router.put('/update/:id', updateVeterinarian);
router.delete('/delete/:id', deleteVeterinarian);

export default router;
