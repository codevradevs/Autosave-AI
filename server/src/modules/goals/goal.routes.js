import { Router } from 'express';
import { getGoals, createGoal, contributeToGoal, withdrawFromGoal, deleteGoal } from './goal.controller.js';
import { protect } from '../../middlewares/auth.js';

const router = Router();

router.use(protect);
router.get('/', getGoals);
router.post('/', createGoal);
router.post('/:id/contribute', contributeToGoal);
router.post('/:id/withdraw', withdrawFromGoal);
router.delete('/:id', deleteGoal);

export default router;
