import express from 'express';

import * as userController from './user.controllers';

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUserById);

export default router;
