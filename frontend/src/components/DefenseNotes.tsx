import type { AttackScenario } from '../types';

interface DefenseNotesProps {
  scenarios: AttackScenario[];
}

export function DefenseNotes({ scenarios }: DefenseNotesProps) {
  return (
    <section className="card p-4">
      <p className="panel-title">Defense Notes</p>
      <h2 className="mt-2 text-lg font-semibold text-white">Mitigations mapped to abuse paths</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {scenarios.map((scenario) => (
          <article key={scenario.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-base font-semibold text-white">{scenario.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{scenario.vulnerableImpact}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
              {scenario.defenseNotes.map((note, index) => (
                <li key={`${scenario.id}-${index}`}>{note}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}