import axios from 'axios';
import { getMpesaToken, getMpesaTimestamp, getMpesaPassword, MPESA_BASE } from '../../config/mpesa.js';
import User from '../user/user.model.js';
import Wallet from '../wallet/wallet.model.js';
import Transaction from '../transaction/transaction.model.js';
import { triggerAutoSave } from '../autosave/autosave.service.js';

export const initiateSTKPush = async (phone, amount, userId) => {
  const token = await getMpesaToken();
  const timestamp = getMpesaTimestamp();
  const password = getMpesaPassword(timestamp);

  // Normalize phone: 0712... → 254712...
  const normalizedPhone = phone.startsWith('0')
    ? `254${phone.slice(1)}`
    : phone.replace('+', '');

  const response = await axios.post(
    `${MPESA_BASE}/mpesa/stkpush/v1/processrequest`,
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: normalizedPhone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: normalizedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: 'AutoSaveAI',
      TransactionDesc: 'Deposit to AutoSave wallet'
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // Create pending transaction
  await Transaction.create({
    userId,
    type: 'deposit',
    amount,
    status: 'pending',
    reference: response.data.CheckoutRequestID,
    description: 'M-Pesa STK Push deposit'
  });

  return response.data;
};

export const handleSTKCallback = async (body) => {
  const callback = body?.Body?.stkCallback;
  if (!callback) return;

  const { ResultCode, CheckoutRequestID, CallbackMetadata } = callback;

  const tx = await Transaction.findOne({ reference: CheckoutRequestID });
  if (!tx) return;

  if (ResultCode !== 0) {
    tx.status = 'failed';
    await tx.save();
    return;
  }

  const items = CallbackMetadata?.Item || [];
  const amount = items.find(i => i.Name === 'Amount')?.Value;
  const receipt = items.find(i => i.Name === 'MpesaReceiptNumber')?.Value;
  const phone = items.find(i => i.Name === 'PhoneNumber')?.Value?.toString();

  tx.status = 'completed';
  tx.mpesaReceiptNumber = receipt;
  tx.amount = amount;
  await tx.save();

  // Atomic wallet update
  await Wallet.findOneAndUpdate(
    { userId: tx.userId },
    { $inc: { balance: amount, totalDeposited: amount } }
  );

  // Trigger autosave after deposit
  await triggerAutoSave(tx.userId);
};

export const initiateB2C = async (userId, amount) => {
  const user = await User.findById(userId);
  const wallet = await Wallet.findOne({ userId });

  if (!wallet || wallet.balance < amount) {
    throw new Error('Insufficient balance');
  }

  const token = await getMpesaToken();
  const phone = (user.mpesaNumber || user.phone).replace('+', '');
  const normalizedPhone = phone.startsWith('0') ? `254${phone.slice(1)}` : phone;

  // Deduct immediately (optimistic), mark tx pending
  await Wallet.findOneAndUpdate(
    { userId, balance: { $gte: amount } },
    { $inc: { balance: -amount, totalWithdrawn: amount } }
  );

  const tx = await Transaction.create({
    userId,
    type: 'withdrawal',
    amount,
    status: 'pending',
    description: 'Withdrawal to M-Pesa'
  });

  try {
    const response = await axios.post(
      `${MPESA_BASE}/mpesa/b2c/v1/paymentrequest`,
      {
        InitiatorName: 'AutoSaveAI',
        SecurityCredential: process.env.MPESA_SECURITY_CREDENTIAL || 'test',
        CommandID: 'BusinessPayment',
        Amount: Math.round(amount),
        PartyA: process.env.MPESA_SHORTCODE,
        PartyB: normalizedPhone,
        Remarks: 'AutoSave withdrawal',
        QueueTimeOutURL: `${process.env.MPESA_CALLBACK_URL}/timeout`,
        ResultURL: `${process.env.MPESA_CALLBACK_URL}/b2c`,
        Occasion: 'Withdrawal'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    tx.reference = response.data.ConversationID;
    tx.status = 'completed';
    await tx.save();

    return { message: 'Withdrawal initiated', amount, reference: tx.reference };
  } catch (err) {
    // Rollback on failure
    await Wallet.findOneAndUpdate({ userId }, { $inc: { balance: amount, totalWithdrawn: -amount } });
    tx.status = 'failed';
    await tx.save();
    throw err;
  }
};
