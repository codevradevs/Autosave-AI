import Transaction from './transaction.model.js';

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 20, type } = req.query;
    const filter = { userId: req.user.id, status: 'completed' };
    if (type) filter.type = type;

    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(filter);

    res.json({ transactions, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
