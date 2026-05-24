import type { SimulationMode } from '../types';

interface DefenseToggleProps {
  mode: SimulationMode;
  trustedNonce: string;
  onToggle: (mode: SimulationMode) => void;
  onRefreshNonce: () => void;
}

export function DefenseToggle({ mode, trustedNonce, onToggle, onRefreshNonce }: DefenseToggleProps) {
  return (
    <section className="card p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="panel-title">Defense Control</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Validation behavior</h2>
          <p className="mt-2 text-sm text-slate-400">
            Vulnerable mode accepts unsafe mock events. Hardened mode enforces origin checks, schema expectations, nonce pairing, and action allowlisting.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex rounded-xl border border-slate-700 p-1">
            <button
              type="button"
              onClick={() => onToggle('vulnerable')}
              className={mode === 'vulnerable' ? 'btn-primary' : 'btn-secondary'}
              aria-pressed={mode === 'vulnerable'}
            >
              Vulnerable
            </button>
            <button
              type="button"
              onClick={() => onToggle('hardened')}
              className={mode === 'hardened' ? 'btn-primary ml-1' : 'btn-secondary ml-1'}
              aria-pressed={mode === 'hardened'}
            >
              Hardened
            </button>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300">
            Trusted nonce: <span className="font-mono text-cyan-300">{trustedNonce}</span>
          </div>
          <button type="button" onClick={onRefreshNonce} className="btn-secondary">
            Refresh nonce
          </button>
        </div>
      </div>
    </section>
  );
}