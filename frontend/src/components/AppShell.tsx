import type { ReactNode } from 'react';

interface AppShellProps {
  activePath: string;
  onNavigate: (path: string) => void;
  children: ReactNode;
}

const navItems = [
  { path: '/', label: 'Simulation' },
  { path: '/threat-model', label: 'Threat Model' },
  { path: '/walkthrough', label: 'Walkthrough' },
  { path: '/mitigations', label: 'Mitigations' },
];

export function AppShell({ activePath, onNavigate, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:px-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">SignalGhost</p>
              <h1 className="text-2xl font-bold text-white">Wildcard postMessage Token Heist</h1>
              <p className="mt-1 max-w-3xl text-sm text-slate-400">
                Safe local simulation of vulnerable versus hardened cross-window message handling using fake origins, fake tokens, and deterministic backend validation.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300 shadow-glow">
              Offensive-security aesthetic, defensive-education scope.
            </div>
          </div>
          <nav aria-label="Primary" className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const active = activePath === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => onNavigate(item.path)}
                  className={active ? 'btn-primary' : 'btn-secondary'}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6">{children}</main>
    </div>
  );
}