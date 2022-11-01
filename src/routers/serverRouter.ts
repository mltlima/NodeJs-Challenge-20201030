import { Router } from 'express';

import { getStatus } from '@/controllers/serverController';

export const statusRouter = Router();
statusRouter.get('/', getStatus);