import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'autosave', 'goal_save', 'goal_withdraw'],
    required: true
  },

  amount: { type: Number, required: true, min: 1 },

  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },

  reference: { type: String },
  mpesaReceiptNumber: { type: String },
  description: { type: String },
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  metadata: { type: Object }
}, { timestamps: true });

transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ reference: 1 });

export default mongoose.model('Transaction', transactionSchema);
