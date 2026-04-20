import { Router } from 'express';
import { getWallet, unlockSavings } from './wallet.controller.js';
import { protect } from '../../middlewares/auth.js';

const router = Router();

router.use(protect);
router.get('/', getWallet);
router.post('/unlock', unlockSavings);

export default router;
