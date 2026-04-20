import cron from 'node-cron';
import User from '../modules/user/user.model.js';
import Wallet from '../modules/wallet/wallet.model.js';
import { updateUserProfile, triggerAutoSave } from '../modules/autosave/autosave.service.js';

// Daily: update all user financial profiles at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('[CRON] Running daily profile updates...');
  const users = await User.find({ isActive: true });
  for (const user of users) {
    try {
      await updateUserProfile(user._id);
    } catch (err) {
      console.error(`Profile update failed for ${user._id}:`, err.message);
    }
  }
  console.log(`[CRON] Updated profiles for ${users.length} users`);
});

// Every 6 hours: trigger autosave for eligible users
cron.schedule('0 */6 * * *', async () => {
  console.log('[CRON] Running scheduled autosave...');
  const users = await User.find({ isActive: true, autoSaveEnabled: true });
  let saved = 0;
  for (const user of users) {
    try {
      const result = await triggerAutoSave(user._id);
      if (result) saved++;
    } catch (err) {
      console.error(`AutoSave failed for ${user._id}:`, err.message);
    }
  }
  console.log(`[CRON] AutoSaved for ${saved}/${users.length} users`);
});

console.log('[CRON] Jobs scheduled');
