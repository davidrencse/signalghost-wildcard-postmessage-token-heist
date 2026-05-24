export function SafeScopeBanner() {
  return (
    <section className="card mb-6 border-cyan-900/60 bg-cyan-950/20 p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="panel-title">Safe Scope</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Fake data only, fully local simulation</h2>
          <p className="mt-2 text-sm text-slate-300">
            This interface uses bundled fake users, fake session tokens, fake receipts, and mock actions. It does not target real websites,
            real credentials, third-party services, or live browser contexts.
          </p>
        </div>
        <div className="badge border-cyan-700 bg-cyan-500/10 text-cyan-200">Controlled iframe simulation</div>
      </div>
    </section>
  );
}