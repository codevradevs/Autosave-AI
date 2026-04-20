import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: 0, min: 0 },
  lockedBalance: { type: Number, default: 0, min: 0 },
  totalSaved: { type: Number, default: 0 },
  totalDeposited: { type: Number, default: 0 },
  totalWithdrawn: { type: Number, default: 0 },
  currency: { type: String, default: 'KES' }
}, { timestamps: true });

walletSchema.virtual('totalBalance').get(function () {
  return this.balance + this.lockedBalance;
});

export default mongoose.model('Wallet', walletSchema);
