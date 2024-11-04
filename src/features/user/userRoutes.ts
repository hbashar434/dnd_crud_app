import { Router } from 'express';
import {
  addUser,
  fetchUsers,
  fetchUserById,
  modifyUser,
  removeUser,
} from './userController';

const router = Router();

router.post('/', addUser);
router.get('/', fetchUsers);
router.get('/:id', fetchUserById);
router.put('/:id', modifyUser);
router.delete('/:id', removeUser);

export default router;
