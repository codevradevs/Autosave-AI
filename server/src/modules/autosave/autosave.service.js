import User from '../user/user.model.js';
import Wallet from '../wallet/wallet.model.js';
import Transaction from '../transaction/transaction.model.js';

export const calculateSaveAmount = (user, wallet) => {
  const buffer = 300;
  const minBalance = user.profile?.minBalance || 200;
  const safe = wallet.balance - (minBalance + buffer);

  if (safe <= 0) return 0;

  let percentage = user.profile?.savingTolerance || 0.05;
  if (user.savingPreference === 'aggressive') percentage = 0.10;
  if (user.savingPreference === 'low') percentage = 0.02;

  const amount = Math.floor(Math.min(safe, wallet.balance * percentage));
  return amount < 10 ? 0 : amount; // minimum save KES 10
};

export const triggerAutoSave = async (userId) => {
  const user = await User.findById(userId);
  if (!user || !user.autoSaveEnabled) return null;

  const wallet = await Wallet.findOne({ userId });
  if (!wallet) return null;

  const saveAmount = calculateSaveAmount(user, wallet);
  if (saveAmount <= 0) return null;

  // Atomic update to prevent race conditions
  const updated = await Wallet.findOneAndUpdate(
    { userId, balance: { $gte: saveAmount } },
    { $inc: { balance: -saveAmount, lockedBalance: saveAmount, totalSaved: saveAmount } },
    { new: true }
  );

  if (!updated) return null;

  const tx = await Transaction.create({
    userId,
    type: 'autosave',
    amount: saveAmount,
    status: 'completed',
    description: `AutoSave — AI detected safe saving window`
  });

  return { saveAmount, transaction: tx };
};

export const updateUserProfile = async (userId) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const transactions = await Transaction.find({
    userId,
    status: 'completed',
    createdAt: { $gte: thirtyDaysAgo }
  });

  if (transactions.length === 0) return;

  const deposits = transactions.filter(t => t.type === 'deposit');
  const avgIncome = deposits.length > 0
    ? deposits.reduce((sum, t) => sum + t.amount, 0) / deposits.length
    : 0;

  const wallet = await Wallet.findOne({ userId });
  const avgBalance = wallet?.balance || 0;

  // Determine income frequency
  let incomeFrequency = 'unknown';
  if (deposits.length >= 20) incomeFrequency = 'daily';
  else if (deposits.length >= 4) incomeFrequency = 'weekly';
  else if (deposits.length >= 1) incomeFrequency = 'monthly';

  // Compute pain threshold — lowest balance before user withdraws
  const withdrawals = transactions.filter(t => t.type === 'withdrawal');
  const minBalance = withdrawals.length > 0
    ? Math.min(...withdrawals.map(t => t.amount)) * 0.3
    : 200;

  // Risk score: higher = more stable income
  const riskScore = Math.min(deposits.length / 20, 1);

  await User.findByIdAndUpdate(userId, {
    'profile.avgIncome': Math.round(avgIncome),
    'profile.avgBalance': Math.round(avgBalance),
    'profile.minBalance': Math.max(Math.round(minBalance), 200),
    'profile.incomeFrequency': incomeFrequency,
    'profile.riskScore': parseFloat(riskScore.toFixed(2)),
    'profile.lastProfileUpdate': new Date()
  });
};

export const getInsights = async (userId) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [allTx, weekTx, wallet, user] = await Promise.all([
    Transaction.find({ userId, status: 'completed', createdAt: { $gte: thirtyDaysAgo } }),
    Transaction.find({ userId, status: 'completed', createdAt: { $gte: sevenDaysAgo } }),
    Wallet.findOne({ userId }),
    User.findById(userId)
  ]);

  const monthSaved = allTx.filter(t => t.type === 'autosave' || t.type === 'goal_save')
    .reduce((s, t) => s + t.amount, 0);
  const weekSaved = weekTx.filter(t => t.type === 'autosave' || t.type === 'goal_save')
    .reduce((s, t) => s + t.amount, 0);
  const todaySaved = weekTx.filter(t => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return (t.type === 'autosave' || t.type === 'goal_save') && new Date(t.createdAt) >= today;
  }).reduce((s, t) => s + t.amount, 0);

  const dailySavingCapacity = calculateSaveAmount(user, wallet);

  return {
    todaySaved,
    weekSaved,
    monthSaved,
    totalSaved: wallet?.totalSaved || 0,
    dailySavingCapacity,
    savingStreak: Math.floor(monthSaved / Math.max(dailySavingCapacity, 1)),
    canSaveNow: dailySavingCapacity > 0,
    profile: user?.profile
  };
};
