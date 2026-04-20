import { Router } from 'express';
import { getTransactions } from './transaction.controller.js';
import { protect } from '../../middlewares/auth.js';

const router = Router();

router.use(protect);
router.get('/', getTransactions);

export default router;
