import { Router, Request, Response, NextFunction } from 'express';
import { validateMessagePayload } from '../services/messageValidationService';

export const validateMessageRouter = Router();

validateMessageRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = validateMessagePayload(req.body);
    res.json({ result: validationResult });
  } catch (error) {
    next(error);
  }
});