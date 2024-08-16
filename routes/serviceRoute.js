import express from 'express';
import {
  createService,
  getService,
  getServices,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', getServices);
router.post('/new', createService);
router.get('/service/:id', getService);
router.put('/update/:id', updateService);
router.delete('/delete/:id', deleteService);

export default router;
