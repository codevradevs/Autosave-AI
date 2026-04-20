import { Router } from 'express';
import { manualAutoSave, getAutoSaveInsights, toggleAutoSave, updateSavingPreference } from './autosave.controller.js';
import { protect } from '../../middlewares/auth.js';

const router = Router();

router.use(protect);
router.post('/trigger', manualAutoSave);
router.get('/insights', getAutoSaveInsights);
router.patch('/toggle', toggleAutoSave);
router.patch('/preference', updateSavingPreference);

export default router;
