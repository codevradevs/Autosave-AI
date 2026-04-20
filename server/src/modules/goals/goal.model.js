import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  emoji: { type: String, default: '🎯' },
  targetAmount: { type: Number, required: true, min: 1 },
  savedAmount: { type: Number, default: 0 },
  deadline: { type: Date },
  isLocked: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  autoContribute: { type: Boolean, default: false },
  autoContributeAmount: { type: Number, default: 0 }
}, { timestamps: true });

goalSchema.virtual('progress').get(function () {
  return Math.min((this.savedAmount / this.targetAmount) * 100, 100);
});

goalSchema.virtual('remaining').get(function () {
  return Math.max(this.targetAmount - this.savedAmount, 0);
});

export default mongoose.model('Goal', goalSchema);
