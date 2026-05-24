import { Router, Request, Response } from 'express';
import { loadScenarios } from '../services/scenarioService';

export const scenariosRouter = Router();

scenariosRouter.get('/', (_req: Request, res: Response) => {
  const scenarios = loadScenarios();
  res.json({ scenarios });
});