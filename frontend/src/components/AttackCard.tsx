import type { AttackScenario } from '../types';
import { categoryLabel, capitalize } from '../utils/formatters';

interface AttackCardProps {
  scenario: AttackScenario;
  selected: boolean;
  running: boolean;
  onRun: (scenario: AttackScenario) => void;
}

export function AttackCard({ scenario, selected, running, onRun }: AttackCardProps) {
  return (
    <article className={`card p-4 transition ${selected ? 'border-cyan-500 shadow-glow' : 'border-slate-800'}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <span className="badge border-slate-700 bg-slate-800 text-slate-200">{categoryLabel(scenario.category)}</span>
          <span className="badge border-slate-700 bg-slate-800 text-slate-200">{capitalize(scenario.difficulty)}</span>
        </div>
        <span className="text-xs text-slate-500">{scenario.id}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{scenario.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{scenario.description}</p>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-slate-500">Payload summary</dt>
          <dd className="text-slate-200">{scenario.payloadSummary}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Vulnerable impact</dt>
          <dd className="text-rose-300">{scenario.vulnerableImpact}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Hardened checks</dt>
          <dd className="text-cyan-300">{scenario.hardenedChecks.join(', ')}</dd>
        </div>
      </dl>
      <button type="button" onClick={() => onRun(scenario)} className="btn-primary mt-5 w-full" disabled={running}>
        {running ? 'Dispatching…' : 'Run attack simulation'}
      </button>
    </article>
  );
}