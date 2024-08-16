import express from 'express';
import {
  createService,
  getService,
  getServices,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

const router = express.Router();
export default router;
