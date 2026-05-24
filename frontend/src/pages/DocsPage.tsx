import type { ReactNode } from 'react';

interface DocsPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}

export function DocsPage({ eyebrow, title, intro, children }: DocsPageProps) {
  return (
    <div className="space-y-6">
      <section className="card p-6">
        <p className="panel-title">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold text-white">{title}</h2>
        <p className="mt-3 max-w-4xl text-sm text-slate-400">{intro}</p>
      </section>
      <section className="grid gap-6">{children}</section>
    </div>
  );
}