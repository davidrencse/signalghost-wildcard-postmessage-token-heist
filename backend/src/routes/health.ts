import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    ok: true,
    service: 'SignalGhost Backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});