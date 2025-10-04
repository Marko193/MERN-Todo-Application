import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { TodoRouter } from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', TodoRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGO = process.env.MONGO_DB_URI || '';

if (!MONGO) {
  console.error('MONGO_DB_URI is not set in .env');
  process.exit(1);
}

console.log('Connecting to MongoDB at', MONGO);

async function start() {
  try {
    await mongoose.connect(MONGO);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
}

start();
