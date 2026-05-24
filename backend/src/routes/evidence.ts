import { Router, Request, Response } from 'express';
import { generateEvidence } from '../services/evidenceService';

export const evidenceRouter = Router();

evidenceRouter.post('/', (req: Request, res: Response) => {
  const evidence = generateEvidence(req.body);
  res.json({ evidence });
});