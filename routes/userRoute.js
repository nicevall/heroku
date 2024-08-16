import express from 'express';

import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/new', createUser);
router.get('/user/:id', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;