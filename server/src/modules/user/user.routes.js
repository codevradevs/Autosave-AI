import { Router } from 'express';
import { register, login, getMe, updateProfile } from './user.controller.js';
import { protect } from '../../middlewares/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.patch('/me', protect, updateProfile);

export default router;
