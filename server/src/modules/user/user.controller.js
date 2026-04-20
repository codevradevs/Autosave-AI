import jwt from 'jsonwebtoken';
import User from './user.model.js';
import Wallet from '../wallet/wallet.model.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

export const register = async (req, res) => {
  try {
    const { name, phone, pin, email, mpesaNumber } = req.body;

    const exists = await User.findOne({ phone });
    if (exists) return res.status(400).json({ message: 'Phone number already registered' });

    const user = await User.create({ name, phone, pin, email, mpesaNumber: mpesaNumber || phone });

    // Create wallet for user
    await Wallet.create({ userId: user._id });

    const token = signToken(user._id);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, phone: user.phone, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, pin } = req.body;
    const user = await User.findOne({ phone }).select('+pin');
    if (!user || !(await user.comparePin(pin))) {
      return res.status(401).json({ message: 'Invalid phone or PIN' });
    }
    const token = signToken(user._id);
    res.json({
      token,
      user: { id: user._id, name: user.name, phone: user.phone, email: user.email, autoSaveEnabled: user.autoSaveEnabled, savingPreference: user.savingPreference }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const wallet = await Wallet.findOne({ userId: req.user.id });
    res.json({ user, wallet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, mpesaNumber } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, mpesaNumber },
      { new: true, runValidators: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
