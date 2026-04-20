import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import './jobs/cron.js';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`AutoSave AI server running on port ${PORT}`);
  });
});
