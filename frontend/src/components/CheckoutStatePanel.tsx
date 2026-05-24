import type { CheckoutWidgetState, SimulationMode } from '../types';
import { truncateMiddle } from '../utils/formatters';

interface CheckoutStatePanelProps {
  state: CheckoutWidgetState;
  mode: SimulationMode;
}

export function CheckoutStatePanel({ state, mode }: CheckoutStatePanelProps) {
  const tokenVisible = state.sessionTokenStatus === 'exposed';

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Session token</p>
        <p className={`mt-2 font-mono text-sm ${tokenVisible ? 'text-rose-300' : 'text-emerald-300'}`}>
          {tokenVisible ? state.fakeSessionToken : truncateMiddle(state.fakeSessionToken.replace(/./g, '•'), 10, 4)}
        </p>
        <p className="mt-2 text-xs text-slate-400">Status: {state.sessionTokenStatus}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Receipt</p>
        <p className="mt-2 text-sm text-slate-200">{state.receiptId}</p>
        <p className="mt-2 text-xs text-slate-400">Refund state: {state.refundStatus}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 md:col-span-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Account note</p>
        <p className="mt-2 text-sm text-slate-200">{state.accountNote}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 md:col-span-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Last impact</p>
        <p className="mt-2 text-sm text-slate-200">{state.lastImpact || 'No accepted state mutation yet.'}</p>
        <p className="mt-2 text-xs text-slate-400">Current mode: {mode}</p>
      </div>
    </div>
  );
}