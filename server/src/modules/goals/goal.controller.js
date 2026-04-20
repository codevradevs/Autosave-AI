import Goal from './goal.model.js';
import Wallet from '../wallet/wallet.model.js';
import Transaction from '../transaction/transaction.model.js';

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createGoal = async (req, res) => {
  try {
    const { title, targetAmount, deadline, emoji, isLocked, autoContribute, autoContributeAmount } = req.body;
    const goal = await Goal.create({
      userId: req.user.id,
      title,
      targetAmount,
      deadline,
      emoji: emoji || '🎯',
      isLocked: isLocked || false,
      autoContribute: autoContribute || false,
      autoContributeAmount: autoContributeAmount || 0
    });
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const contributeToGoal = async (req, res) => {
  try {
    const { amount } = req.body;
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    if (goal.isCompleted) return res.status(400).json({ message: 'Goal already completed' });

    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Atomic wallet deduction
    await Wallet.findOneAndUpdate(
      { userId: req.user.id, balance: { $gte: amount } },
      { $inc: { balance: -amount, lockedBalance: amount, totalSaved: amount } }
    );

    goal.savedAmount += amount;
    if (goal.savedAmount >= goal.targetAmount) goal.isCompleted = true;
    await goal.save();

    await Transaction.create({
      userId: req.user.id,
      type: 'goal_save',
      amount,
      status: 'completed',
      goalId: goal._id,
      description: `Saved towards: ${goal.title}`
    });

    res.json({ goal, message: goal.isCompleted ? `🎉 Goal "${goal.title}" completed!` : `KES ${amount} saved towards ${goal.title}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const withdrawFromGoal = async (req, res) => {
  try {
    const { amount } = req.body;
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    if (goal.isLocked && !goal.isCompleted) {
      return res.status(400).json({ message: 'This goal is locked until completed' });
    }
    if (goal.savedAmount < amount) {
      return res.status(400).json({ message: 'Insufficient goal balance' });
    }

    await Wallet.findOneAndUpdate(
      { userId: req.user.id },
      { $inc: { lockedBalance: -amount, balance: amount } }
    );

    goal.savedAmount -= amount;
    await goal.save();

    await Transaction.create({
      userId: req.user.id,
      type: 'goal_withdraw',
      amount,
      status: 'completed',
      goalId: goal._id,
      description: `Withdrew from: ${goal.title}`
    });

    res.json({ goal, message: `KES ${amount} returned to your balance` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    // Return saved amount to balance
    if (goal.savedAmount > 0) {
      await Wallet.findOneAndUpdate(
        { userId: req.user.id },
        { $inc: { lockedBalance: -goal.savedAmount, balance: goal.savedAmount } }
      );
    }

    await goal.deleteOne();
    res.json({ message: 'Goal deleted and funds returned to balance' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
