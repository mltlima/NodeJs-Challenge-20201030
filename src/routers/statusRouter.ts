import { Router } from 'express';

import { getStatus } from '@/controllers/statusController';

export const statusRouter = Router();
statusRouter.get('/', getStatus);