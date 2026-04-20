import jwt from 'jsonwebtoken';
import User from '../modules/user/user.model.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null;

    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) return res.status(401).json({ message: 'User not found' });

    req.user = { id: user._id.toString() };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
