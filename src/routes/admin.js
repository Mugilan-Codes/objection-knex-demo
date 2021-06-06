import express from 'express';

import { adminController } from '../controllers';

const router = express.Router();

router.post('/signup', adminController.signUp);
router.post('/login', adminController.login);

export default router;
