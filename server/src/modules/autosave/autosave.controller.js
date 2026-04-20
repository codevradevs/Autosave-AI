import { triggerAutoSave, getInsights } from './autosave.service.js';
import Wallet from '../wallet/wallet.model.js';
import User from '../user/user.model.js';

export const manualAutoSave = async (req, res) => {
  try {
    const result = await triggerAutoSave(req.user.id);
    if (!result) {
      return res.status(400).json({ message: 'Balance too low to save right now' });
    }
    res.json({ message: `Saved KES ${result.saveAmount} 🎉`, ...result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAutoSaveInsights = async (req, res) => {
  try {
    const insights = await getInsights(req.user.id);
    res.json(insights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleAutoSave = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.autoSaveEnabled = !user.autoSaveEnabled;
    await user.save();
    res.json({ autoSaveEnabled: user.autoSaveEnabled });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSavingPreference = async (req, res) => {
  try {
    const { preference } = req.body;
    if (!['low', 'medium', 'aggressive'].includes(preference)) {
      return res.status(400).json({ message: 'Invalid preference' });
    }
    await User.findByIdAndUpdate(req.user.id, { savingPreference: preference });
    res.json({ savingPreference: preference });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
