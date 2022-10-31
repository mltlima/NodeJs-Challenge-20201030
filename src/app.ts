import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB, main } from '@/config';

loadEnv();
main();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/', (_req, res) => res.send('OK!'))

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;