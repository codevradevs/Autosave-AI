import { Router } from 'express';
import { deposit, stkCallback, withdraw } from './mpesa.controller.js';
import { protect } from '../../middlewares/auth.js';

const router = Router();

router.post('/deposit', protect, deposit);
router.post('/withdraw', protect, withdraw);
router.post('/callback', stkCallback); // Public — called by Safaricom

export default router;
