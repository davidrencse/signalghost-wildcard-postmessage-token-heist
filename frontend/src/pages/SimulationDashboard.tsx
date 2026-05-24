import { useEffect, useMemo, useState } from 'react';
import { generateEvidence, getHealth, getScenarios, validateMessage } from '../api/client';
import { AttackConsole } from '../components/AttackConsole';
import { CheckoutFrame } from '../components/CheckoutFrame';
import { DefenseNotes } from '../components/DefenseNotes';
import { DefenseToggle } from '../components/DefenseToggle';
import { EvidenceExport } from '../components/EvidenceExport';
import { MessageTimeline } from '../components/MessageTimeline';
import { SafeScopeBanner } from '../components/SafeScopeBanner';
import { StatusView } from '../components/StatusView';
import type {
  AttackScenario,
  CheckoutWidgetState,
  EvidenceDocument,
  EvidenceMode,
  HealthResponse,
  SimulationMode,
  TimelineEvent,
} from '../types';
import { generateNonce } from '../utils/nonce';
import { buildScenarioPayload } from '../utils/scenarioPayloads';
import { buildLocalEvidence } from '../utils/evidenceFallback';

function createInitialWidgetState(): CheckoutWidgetState {
  return {
    sessionTokenStatus: 'redacted',
    fakeSessionToken: 'fake_tok_live_demo_7f4ac2d09e11_safe',
    receiptId: 'rcpt_fake_8842',
    refundStatus: 'none',
    accountNote: 'Customer requested email receipt only. No refund action recorded.',
    lastImpact: null,
    trustedNonce: generateNonce(),
  };
}

function makeEvent(partial: Omit<TimelineEvent, 'id' | 'timestamp'>): TimelineEvent {
  return {
    id: `evt_${crypto.randomUUID()}`,
    timestamp: new Date().toISOString(),
    ...partial,
  };
}

export function SimulationDashboard() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [healthError, setHealthError] = useState<string | null>(null);

  const [scenarios, setScenarios] = useState<AttackScenario[]>([]);
  const [scenariosLoading, setScenariosLoading] = useState(true);
  const [scenariosError, setScenariosError] = useState<string | null>(null);

  const [mode, setMode] = useState<SimulationMode>('vulnerable');
  const [widgetState, setWidgetState] = useState<CheckoutWidgetState>(createInitialWidgetState());
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [runningScenarioId, setRunningScenarioId] = useState<string | null>(null);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const [announce, setAnnounce] = useState('');

  const [evidenceDoc, setEvidenceDoc] = useState<EvidenceDocument | null>(null);
  const [evidenceLoading, setEvidenceLoading] = useState(false);
  const [evidenceError, setEvidenceError] = useState<string | null>(null);

  const loadHealth = async () => {
    setHealthLoading(true);
    setHealthError(null);
    try {
      const data = await getHealth();
      setHealth(data);
    } catch (error) {
      setHealthError(error instanceof Error ? error.message : 'Unable to load backend health status.');
      setHealth(null);
    } finally {
      setHealthLoading(false);
    }
  };

  const loadScenarios = async () => {
    setScenariosLoading(true);
    setScenariosError(null);
    try {
      const data = await getScenarios();
      setScenarios(data.scenarios);
    } catch (error) {
      setScenariosError(error instanceof Error ? error.message : 'Unable to load scenarios from the backend.');
      setScenarios([]);
    } finally {
      setScenariosLoading(false);
    }
  };

  useEffect(() => {
    void loadHealth();
    void loadScenarios();
  }, []);

  const resetWidget = (nextMode: SimulationMode = mode) => {
    setWidgetState({ ...createInitialWidgetState(), trustedNonce: generateNonce() });
    setAnnounce(`Simulation reset in ${nextMode} mode.`);
  };

  const handleModeToggle = (nextMode: SimulationMode) => {
    setMode(nextMode);
    setWidgetState((prev) => ({ ...createInitialWidgetState(), trustedNonce: generateNonce() }));
    setAnnounce(`Validation switched to ${nextMode} mode.`);
  };

  const handleRunScenario = async (scenario: AttackScenario) => {
    setSelectedScenarioId(scenario.id);
    setRunningScenarioId(scenario.id);
    setAnnounce(`Dispatching ${scenario.title}.`);

    const messageId = `msg_${crypto.randomUUID()}`;
    const sentAt = new Date().toISOString();
    const message = {
      id: messageId,
      scenarioId: scenario.id,
      sender: 'rogue_parent' as const,
      receiver: 'victim_checkout' as const,
      claimedOrigin: scenario.mockOrigin,
      targetOrigin: scenario.targetOrigin,
      action: scenario.action,
      payload: buildScenarioPayload(scenario),
      nonce: mode === 'hardened' ? null : 'unsafe-parent-nonce',
      sentAt,
    };

    const sentEvent = makeEvent({
      scenarioId: scenario.id,
      sender: 'rogue_parent',
      receiver: 'victim_checkout',
      claimedOrigin: scenario.mockOrigin,
      action: scenario.action,
      validationResult: 'informational',
      failedChecks: [],
      impact: 'Message dispatched to validation endpoint.',
      details: scenario.payloadSummary,
    });

    setEvents((prev) => [...prev, sentEvent]);

    try {
      const response = await validateMessage({
        mode,
        message,
        trustedContext: {
          allowedOrigins: ['https://checkout.signalghost.local'],
          expectedReceiver: 'victim_checkout',
          expectedNonce: widgetState.trustedNonce,
          allowedActions: ['reveal_token', 'approve_refund', 'update_note'],
        },
      });

      const result = response.result;

      const validationEvent = makeEvent({
        scenarioId: scenario.id,
        sender: 'validation_service',
        receiver: 'victim_checkout',
        claimedOrigin: scenario.mockOrigin,
        action: result.normalizedAction || scenario.action,
        validationResult: result.accepted ? 'accepted' : 'rejected',
        failedChecks: result.failedChecks.map((item) => `${item.check}: ${item.reason}`),
        impact: result.uiImpact.description,
        details: result.safePayloadSummary,
      });

      setEvents((prev) => [...prev, validationEvent]);

      if (result.accepted) {
        setWidgetState((prev) => {
          const next = { ...prev, lastImpact: result.uiImpact.description };
          if (result.uiImpact.impactType === 'token_exposed') {
            next.sessionTokenStatus = 'exposed';
          }
          if (result.uiImpact.impactType === 'refund_approved') {
            next.refundStatus = 'approved';
          }
          if (result.uiImpact.impactType === 'note_changed') {
            next.accountNote = String(message.payload.note || 'Fake account note updated by accepted message.');
          }
          return next;
        });
        setAnnounce(`${scenario.title} accepted. ${result.uiImpact.description}`);
      } else {
        setAnnounce(`${scenario.title} rejected. ${result.failedChecks.map((item) => item.check).join(', ') || 'Validation blocked the message'}.`);
      }
    } catch (error) {
      const messageText = error instanceof Error ? error.message : 'Validation request failed.';
      setEvents((prev) => [
        ...prev,
        makeEvent({
          scenarioId: scenario.id,
          sender: 'frontend',
          receiver: 'user',
          claimedOrigin: 'local-ui',
          action: 'validate-message',
          validationResult: 'rejected',
          failedChecks: ['network_or_api_failure'],
          impact: 'No widget mutation performed because backend validation was unavailable.',
          details: messageText,
        }),
      ]);
      setAnnounce(`Scenario failed because the backend validation endpoint was unavailable.`);
    } finally {
      setRunningScenarioId(null);
    }
  };

  const evidenceMode: EvidenceMode = useMemo(() => {
    const hasAccepted = events.some((event) => event.validationResult === 'accepted');
    const hasRejected = events.some((event) => event.validationResult === 'rejected');
    if (hasAccepted && hasRejected) return 'mixed';
    return mode;
  }, [events, mode]);

  const handleGenerateEvidence = async (title: string, includeMitigations: boolean) => {
    setEvidenceLoading(true);
    setEvidenceError(null);
    try {
      const response = await generateEvidence({
        title,
        mode: evidenceMode,
        generatedBy: 'SignalGhost Frontend',
        events,
        includeMitigations,
      });
      setEvidenceDoc(response.evidence);
      setAnnounce('Evidence narrative generated from backend formatter.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to generate evidence from backend.';
      setEvidenceError(`${message} A local fallback report has been generated for continuity.`);
      const fallback = buildLocalEvidence(title, evidenceMode, events, scenarios, includeMitigations);
      setEvidenceDoc(fallback);
      setAnnounce('Backend evidence generation failed. Local fallback narrative generated.');
    } finally {
      setEvidenceLoading(false);
    }
  };

  if (healthLoading || scenariosLoading) {
    return <StatusView title="Loading simulation workspace" message="Connecting to the backend and loading safe scenario definitions." />;
  }

  if (healthError && scenarios.length === 0) {
    return (
      <StatusView
        title="Backend unavailable"
        message={`Health check failed: ${healthError}. Scenario loading also failed, so the simulation cannot start until the backend is running.`}
        actionLabel="Retry"
        onAction={() => {
          void loadHealth();
          void loadScenarios();
        }}
      />
    );
  }

  if (scenariosError && scenarios.length === 0) {
    return <StatusView title="No scenarios available" message={scenariosError} actionLabel="Retry" onAction={() => void loadScenarios()} />;
  }

  if (scenarios.length === 0) {
    return <StatusView title="Empty scenario set" message="The backend responded successfully but returned no scenarios to simulate." actionLabel="Reload" onAction={() => void loadScenarios()} />;
  }

  return (
    <div className="space-y-6">
      <div className="sr-only" aria-live="polite">
        {announce}
      </div>

      <SafeScopeBanner />

      <section className="grid gap-4 lg:grid-cols-[1.4fr,1fr]">
        <div className="card p-4">
          <p className="panel-title">Backend status</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="badge border-emerald-700 bg-emerald-500/10 text-emerald-300">{health?.ok ? 'API reachable' : 'Unavailable'}</span>
            {health ? (
              <>
                <span>Service: {health.service}</span>
                <span>Version: {health.version}</span>
                <span>Environment: {health.environment}</span>
              </>
            ) : null}
            {healthError ? <span className="text-rose-300">{healthError}</span> : null}
          </div>
        </div>
        <div className="card flex items-center justify-between p-4">
          <div>
            <p className="panel-title">Simulation reset</p>
            <p className="mt-2 text-sm text-slate-400">Clear local widget state and keep the timeline for comparison, or clear the timeline below.</p>
          </div>
          <button type="button" onClick={() => resetWidget()} className="btn-secondary">
            Reset widget
          </button>
        </div>
      </section>

      <DefenseToggle mode={mode} trustedNonce={widgetState.trustedNonce} onToggle={handleModeToggle} onRefreshNonce={() => setWidgetState((prev) => ({ ...prev, trustedNonce: generateNonce() }))} />

      <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <AttackConsole
          scenarios={scenarios}
          selectedScenarioId={selectedScenarioId}
          runningScenarioId={runningScenarioId}
          onRun={handleRunScenario}
        />
        <CheckoutFrame state={widgetState} mode={mode} />
      </section>

      <MessageTimeline
        events={events}
        expanded={timelineExpanded}
        onToggleExpanded={() => setTimelineExpanded((prev) => !prev)}
        onClear={() => setEvents([])}
      />

      <EvidenceExport
        events={events}
        scenarios={scenarios}
        mode={evidenceMode}
        loading={evidenceLoading}
        error={evidenceError}
        document={evidenceDoc}
        onGenerate={handleGenerateEvidence}
      />

      <DefenseNotes scenarios={scenarios} />
    </div>
  );
}