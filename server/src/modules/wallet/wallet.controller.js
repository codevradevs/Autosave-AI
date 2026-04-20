import Wallet from './wallet.model.js';
import Transaction from '../transaction/transaction.model.js';
import User from '../user/user.model.js';

export const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unlockSavings = async (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ userId: req.user.id });

    if (!wallet || wallet.lockedBalance < amount) {
      return res.status(400).json({ message: 'Insufficient locked balance' });
    }

    await Wallet.findOneAndUpdate(
      { userId: req.user.id, lockedBalance: { $gte: amount } },
      { $inc: { lockedBalance: -amount, balance: amount } }
    );

    await Transaction.create({
      userId: req.user.id,
      type: 'goal_withdraw',
      amount,
      status: 'completed',
      description: 'Unlocked savings to available balance'
    });

    res.json({ message: `KES ${amount} unlocked to your balance` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
