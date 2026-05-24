import type { CheckoutWidgetState, SimulationMode } from '../types';
import { CheckoutStatePanel } from './CheckoutStatePanel';

interface CheckoutFrameProps {
  state: CheckoutWidgetState;
  mode: SimulationMode;
}

export function CheckoutFrame({ state, mode }: CheckoutFrameProps) {
  return (
    <section className="card p-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="panel-title">Embedded Victim Widget</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Controlled iframe boundary</h2>
          <p className="mt-2 text-sm text-slate-400">
            This checkout surface represents the victim frame. Accepted mock messages mutate only fake local state for demonstration.
          </p>
        </div>
        <div className="badge border-cyan-700 bg-cyan-500/10 text-cyan-200">Mode: {mode}</div>
      </div>
      <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4 shadow-inner">
        <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-500">
          <span>iframe src="/embedded/checkout"</span>
          <span>origin: https://checkout.signalghost.local</span>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">SignalGhost Checkout</h3>
              <p className="text-sm text-slate-400">Fake order review and refund control panel.</p>
            </div>
            <div className="badge border-slate-700 bg-slate-800 text-slate-200">No real payment flow</div>
          </div>
          <CheckoutStatePanel state={state} mode={mode} />
        </div>
      </div>
    </section>
  );
}