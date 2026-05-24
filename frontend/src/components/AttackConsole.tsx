import type { AttackScenario } from '../types';
import { AttackCard } from './AttackCard';

interface AttackConsoleProps {
  scenarios: AttackScenario[];
  selectedScenarioId: string | null;
  runningScenarioId: string | null;
  onRun: (scenario: AttackScenario) => void;
}

export function AttackConsole({ scenarios, selectedScenarioId, runningScenarioId, onRun }: AttackConsoleProps) {
  return (
    <section className="card p-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="panel-title">Rogue Parent Console</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Preset attack cards</h2>
          <p className="mt-2 text-sm text-slate-400">
            Dispatch safe, mock postMessage-style events into the controlled widget. Each card represents a fake abuse path the backend validates.
          </p>
        </div>
        <div className="badge border-rose-700 bg-rose-500/10 text-rose-300">Untrusted sender zone</div>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {scenarios.map((scenario) => (
          <AttackCard
            key={scenario.id}
            scenario={scenario}
            selected={selectedScenarioId === scenario.id}
            running={runningScenarioId === scenario.id}
            onRun={onRun}
          />
        ))}
      </div>
      {scenarios.length === 0 ? <p className="mt-4 text-sm text-slate-400">No scenarios returned by the backend.</p> : null}
    </section>
  );
}