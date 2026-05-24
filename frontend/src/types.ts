export type SimulationMode = 'vulnerable' | 'hardened';
export type ScenarioCategory = 'token_exposure' | 'refund_abuse' | 'note_tampering';
export type SecurityCheck = 'origin' | 'schema' | 'nonce' | 'action_allowlist';
export type MessageActor = 'rogue_parent' | 'victim_checkout';
export type ValidationStatus = 'accepted' | 'rejected' | 'informational';
export type EvidenceMode = 'vulnerable' | 'hardened' | 'mixed';

export interface AttackScenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  safeScope: string;
  mockOrigin: string;
  targetOrigin: string;
  action: string;
  payloadSummary: string;
  vulnerableImpact: string;
  hardenedChecks: SecurityCheck[];
  defenseNotes: string[];
}

export interface SimulatedMessage {
  id: string;
  scenarioId: string;
  sender: MessageActor;
  receiver: MessageActor;
  claimedOrigin: string;
  targetOrigin: string;
  action: string;
  payload: Record<string, unknown>;
  nonce: string | null;
  sentAt: string;
}

export interface TrustedMessageContext {
  allowedOrigins: string[];
  expectedReceiver: string;
  expectedNonce: string;
  allowedActions: string[];
}

export interface ValidationFailure {
  check: SecurityCheck;
  reason: string;
}

export interface UiImpact {
  stateChanged: boolean;
  impactType: 'token_exposed' | 'refund_approved' | 'note_changed' | 'none';
  description: string;
}

export interface ValidationResult {
  accepted: boolean;
  validationMode: SimulationMode;
  failedChecks: ValidationFailure[];
  passedChecks: SecurityCheck[];
  normalizedAction: string | null;
  safePayloadSummary: string;
  uiImpact: UiImpact;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  scenarioId: string | null;
  sender: string;
  receiver: string;
  claimedOrigin: string;
  action: string;
  validationResult: ValidationStatus;
  failedChecks: string[];
  impact: string;
  details: string;
}

export interface EvidenceFinding {
  scenarioId: string | null;
  finding: string;
  impact: string;
  mitigation: string;
}

export interface EvidenceDocument {
  title: string;
  generatedAt: string;
  executiveSummary: string;
  timelineNarrative: string;
  findings: EvidenceFinding[];
  safeScopeNotice: string;
  plainText: string;
  markdown: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details: Record<string, unknown> | null;
  };
}

export interface HealthResponse {
  ok: boolean;
  service: string;
  version: string;
  environment: 'development' | 'test' | 'production';
}

export interface CheckoutWidgetState {
  sessionTokenStatus: 'redacted' | 'exposed';
  fakeSessionToken: string;
  receiptId: string;
  refundStatus: 'none' | 'requested' | 'approved' | 'rejected';
  accountNote: string;
  lastImpact: string | null;
  trustedNonce: string;
}

export interface ValidateMessageRequest {
  mode: SimulationMode;
  message: SimulatedMessage;
  trustedContext: TrustedMessageContext;
}

export interface ValidateMessageResponse {
  result: ValidationResult;
}

export interface ScenariosResponse {
  scenarios: AttackScenario[];
}

export interface EvidenceRequest {
  title: string;
  mode: EvidenceMode;
  generatedBy: string;
  events: TimelineEvent[];
  includeMitigations: boolean;
}

export interface EvidenceResponse {
  evidence: EvidenceDocument;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}