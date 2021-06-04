import express from 'express';

import { userController } from '../controllers';

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUserById);

export default router;
