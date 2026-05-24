import type { AttackScenario } from '../types';

export function buildScenarioPayload(scenario: AttackScenario): Record<string, unknown> {
  if (scenario.category === 'token_exposure') {
    return {
      request: 'reveal_fake_session_token',
      requestedFields: ['fakeSessionToken', 'receiptId'],
      justification: 'parent_sync_debug',
    };
  }

  if (scenario.category === 'refund_abuse') {
    return {
      refundDecision: 'approve',
      receiptId: 'rcpt_fake_8842',
      reason: 'rogue_parent_override',
    };
  }

  return {
    note: 'VIP account flag removed. Refund narrative rewritten by rogue parent simulation.',
    receiptId: 'rcpt_fake_8842',
    editor: 'rogue_parent',
  };
}