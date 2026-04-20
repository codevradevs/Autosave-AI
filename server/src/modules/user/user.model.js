import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  mpesaNumber: { type: String, trim: true },
  pin: { type: String, required: true, select: false },

  savingPreference: {
    type: String,
    enum: ['low', 'medium', 'aggressive'],
    default: 'medium'
  },

  profile: {
    avgIncome: { type: Number, default: 0 },
    avgBalance: { type: Number, default: 0 },
    minBalance: { type: Number, default: 200 },
    savingTolerance: { type: Number, default: 0.05 },
    riskScore: { type: Number, default: 0.5 },
    incomeFrequency: { type: String, default: 'unknown' },
    lastProfileUpdate: { type: Date }
  },

  autoSaveEnabled: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('pin')) return next();
  this.pin = await bcrypt.hash(this.pin, 12);
  next();
});

userSchema.methods.comparePin = async function (candidatePin) {
  return bcrypt.compare(candidatePin, this.pin);
};

export default mongoose.model('User', userSchema);
