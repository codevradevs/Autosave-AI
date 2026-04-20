import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import userRoutes from './modules/user/user.routes.js';
import walletRoutes from './modules/wallet/wallet.routes.js';
import transactionRoutes from './modules/transaction/transaction.routes.js';
import autosaveRoutes from './modules/autosave/autosave.routes.js';
import mpesaRoutes from './modules/mpesa/mpesa.routes.js';
import goalRoutes from './modules/goals/goal.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // Allow any localhost port in development
    if (/^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);
    // Allow configured frontend URL in production
    if (origin === process.env.FRONTEND_URL) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', limiter);

app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/autosave', autosaveRoutes);
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/goals', goalRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

app.use(errorHandler);

export default app;
