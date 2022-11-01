import { Request, Response } from 'express';

import { serverService } from '@/services/serverServices';

export const getStatus = async (req: Request, res: Response) => {
    const json = await serverService.getStatus();
    console.log(json)
    res.status(200).send(json);  
}