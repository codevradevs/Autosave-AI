import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './modules/user/user.model.js';
import Wallet from './modules/wallet/wallet.model.js';
import Transaction from './modules/transaction/transaction.model.js';
import Goal from './modules/goals/goal.model.js';

const users = [
  {
    name: 'Wanjiku Muthoni',
    phone: '0712345678',
    email: 'wanjiku@example.com',
    mpesaNumber: '0712345678',
    savingPreference: 'medium',
    profile: { avgIncome: 18000, avgBalance: 3200, minBalance: 300, savingTolerance: 0.05, riskScore: 0.72, incomeFrequency: 'weekly' },
    autoSaveEnabled: true,
    wallet: { balance: 4500, lockedBalance: 12800, totalSaved: 12800, totalDeposited: 62000, totalWithdrawn: 44700 },
    goals: [
      { title: 'Emergency Fund', emoji: '🏥', targetAmount: 50000, savedAmount: 12800, isLocked: true, deadline: new Date('2025-12-31') },
      { title: 'New Laptop', emoji: '💻', targetAmount: 85000, savedAmount: 0, isLocked: false, deadline: new Date('2025-09-01') },
    ],
  },
  {
    name: 'James Ochieng',
    phone: '0723456789',
    email: 'james@example.com',
    mpesaNumber: '0723456789',
    savingPreference: 'aggressive',
    profile: { avgIncome: 45000, avgBalance: 8500, minBalance: 500, savingTolerance: 0.10, riskScore: 0.88, incomeFrequency: 'monthly' },
    autoSaveEnabled: true,
    wallet: { balance: 9200, lockedBalance: 38500, totalSaved: 38500, totalDeposited: 180000, totalWithdrawn: 132300 },
    goals: [
      { title: 'Buy a Car', emoji: '🚗', targetAmount: 500000, savedAmount: 38500, isLocked: true, deadline: new Date('2026-06-01') },
      { title: 'Vacation', emoji: '✈️', targetAmount: 80000, savedAmount: 0, isLocked: false, deadline: new Date('2025-12-01') },
    ],
  },
  {
    name: 'Amina Hassan',
    phone: '0734567890',
    email: 'amina@example.com',
    mpesaNumber: '0734567890',
    savingPreference: 'low',
    profile: { avgIncome: 12000, avgBalance: 1800, minBalance: 200, savingTolerance: 0.02, riskScore: 0.45, incomeFrequency: 'weekly' },
    autoSaveEnabled: true,
    wallet: { balance: 2100, lockedBalance: 5400, totalSaved: 5400, totalDeposited: 38000, totalWithdrawn: 30500 },
    goals: [
      { title: 'School Fees', emoji: '🎓', targetAmount: 25000, savedAmount: 5400, isLocked: true, deadline: new Date('2025-08-01') },
    ],
  },
  {
    name: 'Brian Kamau',
    phone: '0745678901',
    email: 'brian@example.com',
    mpesaNumber: '0745678901',
    savingPreference: 'medium',
    profile: { avgIncome: 28000, avgBalance: 5100, minBalance: 400, savingTolerance: 0.05, riskScore: 0.65, incomeFrequency: 'monthly' },
    autoSaveEnabled: false,
    wallet: { balance: 6800, lockedBalance: 21000, totalSaved: 21000, totalDeposited: 95000, totalWithdrawn: 67200 },
    goals: [
      { title: 'House Deposit', emoji: '🏠', targetAmount: 200000, savedAmount: 21000, isLocked: true, deadline: new Date('2027-01-01') },
      { title: 'Wedding Ring', emoji: '💍', targetAmount: 30000, savedAmount: 0, isLocked: false },
    ],
  },
  {
    name: 'Fatuma Abdalla',
    phone: '0756789012',
    email: 'fatuma@example.com',
    mpesaNumber: '0756789012',
    savingPreference: 'aggressive',
    profile: { avgIncome: 35000, avgBalance: 7200, minBalance: 500, savingTolerance: 0.10, riskScore: 0.80, incomeFrequency: 'monthly' },
    autoSaveEnabled: true,
    wallet: { balance: 8100, lockedBalance: 29700, totalSaved: 29700, totalDeposited: 140000, totalWithdrawn: 102200 },
    goals: [
      { title: 'Business Capital', emoji: '💼', targetAmount: 150000, savedAmount: 29700, isLocked: true, deadline: new Date('2026-01-01') },
    ],
  },
];

// Generate realistic transaction history for a user
const generateTransactions = (userId, wallet) => {
  const txs = [];
  const now = new Date();

  // 30 days of history
  for (let d = 30; d >= 0; d--) {
    const date = new Date(now);
    date.setDate(date.getDate() - d);

    // Weekly deposits (every 7 days)
    if (d % 7 === 0) {
      const depositAmt = Math.floor(Math.random() * 8000) + 5000;
      txs.push({
        userId,
        type: 'deposit',
        amount: depositAmt,
        status: 'completed',
        reference: `DEP${Date.now()}${d}`,
        description: 'M-Pesa deposit',
        createdAt: new Date(date.setHours(9, 0, 0)),
      });
    }

    // AutoSave triggers (every 2-3 days)
    if (d % 3 === 0 && d > 0) {
      const saveAmt = Math.floor(Math.random() * 300) + 50;
      txs.push({
        userId,
        type: 'autosave',
        amount: saveAmt,
        status: 'completed',
        description: 'AutoSave — AI detected safe saving window',
        createdAt: new Date(date.setHours(14, 30, 0)),
      });
    }

    // Occasional withdrawals
    if (d % 10 === 0 && d > 0) {
      const withdrawAmt = Math.floor(Math.random() * 3000) + 1000;
      txs.push({
        userId,
        type: 'withdrawal',
        amount: withdrawAmt,
        status: 'completed',
        reference: `WDR${Date.now()}${d}`,
        description: 'Withdrawal to M-Pesa',
        createdAt: new Date(date.setHours(16, 0, 0)),
      });
    }
  }

  return txs;
};

const seed = async () => {
  await connectDB();

  console.log('🌱 Clearing existing data...');
  await Promise.all([
    User.deleteMany({}),
    Wallet.deleteMany({}),
    Transaction.deleteMany({}),
    Goal.deleteMany({}),
  ]);

  console.log('👤 Seeding users, wallets, goals, and transactions...\n');

  const hashedPin = await bcrypt.hash('1234', 12);

  for (const userData of users) {
    const { wallet: walletData, goals: goalsData, ...userFields } = userData;

    // Use insertMany to bypass the pre('save') hook so the pin isn't double-hashed
    const [user] = await User.insertMany([{ ...userFields, pin: hashedPin }], { timestamps: true });

    // Create wallet
    await Wallet.create({ userId: user._id, ...walletData });

    // Create goals
    for (const goal of goalsData) {
      await Goal.create({ userId: user._id, ...goal });
    }

    // Create transactions
    const txs = generateTransactions(user._id, walletData);
    await Transaction.insertMany(txs);

    console.log(`  ✅ ${user.name} (${user.phone}) — Balance: KES ${walletData.balance.toLocaleString()} | Saved: KES ${walletData.lockedBalance.toLocaleString()} | ${txs.length} transactions | ${goalsData.length} goals`);
  }

  console.log('\n📊 Seed Summary:');
  console.log(`  Users:        ${await User.countDocuments()}`);
  console.log(`  Wallets:      ${await Wallet.countDocuments()}`);
  console.log(`  Goals:        ${await Goal.countDocuments()}`);
  console.log(`  Transactions: ${await Transaction.countDocuments()}`);
  console.log('\n🔑 All users share PIN: 1234');
  console.log('\n🚀 Login credentials:');
  users.forEach(u => console.log(`  ${u.phone}  →  ${u.name}`));

  await mongoose.disconnect();
  console.log('\n✅ Seed complete. Database disconnected.');
};

seed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
