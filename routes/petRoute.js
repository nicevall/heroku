import express from 'express';
import {
  createPet,
  getPet,
  getPets,
  updatePet,
  deletePet,
} from '../controllers/petController.js';

const router = express.Router();

router.get('/', getPets);
router.post('/new', createPet);
router.get('/pet/:id', getPet);
router.put('/update/:id', updatePet);
router.delete('/delete/:id', deletePet);

export default router;
