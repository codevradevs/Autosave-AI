import { initiateSTKPush, handleSTKCallback, initiateB2C } from './mpesa.service.js';
import User from '../user/user.model.js';

export const deposit = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount < 10) {
      return res.status(400).json({ message: 'Minimum deposit is KES 10' });
    }
    const user = await User.findById(req.user.id);
    const phone = user.mpesaNumber || user.phone;
    const result = await initiateSTKPush(phone, amount, req.user.id);
    res.json({ message: 'Check your phone for M-Pesa prompt', checkoutRequestId: result.CheckoutRequestID });
  } catch (err) {
    res.status(500).json({ message: err.response?.data?.errorMessage || err.message });
  }
};

export const stkCallback = async (req, res) => {
  try {
    await handleSTKCallback(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error('STK Callback error:', err.message);
    res.sendStatus(200); // Always 200 to Safaricom
  }
};

export const withdraw = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount < 10) {
      return res.status(400).json({ message: 'Minimum withdrawal is KES 10' });
    }
    const result = await initiateB2C(req.user.id, amount);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
