import { AttackScenario } from '../types';

export const loadScenarios = (): AttackScenario[] => {
  return [
    {
      id: '1',
      title: 'Token Exposure Attack',
      category: 'token_exposure',
      difficulty: 'beginner',
      description: 'A fake token gets exposed',
      ...  // Additional scenario attributes
    }
    // Additional scenarios...
  ];
};