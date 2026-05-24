import { useMemo, useState } from 'react';
import type { AttackScenario, EvidenceDocument, EvidenceMode, TimelineEvent } from '../types';

interface EvidenceExportProps {
  events: TimelineEvent[];
  scenarios: AttackScenario[];
  mode: EvidenceMode;
  loading: boolean;
  error: string | null;
  document: EvidenceDocument | null;
  onGenerate: (title: string, includeMitigations: boolean) => void;
}

export function EvidenceExport({ events, mode, loading, error, document, onGenerate }: EvidenceExportProps) {
  const [title, setTitle] = useState('SignalGhost Incident Narrative');
  const [includeMitigations, setIncludeMitigations] = useState(true);
  const [format, setFormat] = useState<'markdown' | 'plainText'>('markdown');

  const exportText = useMemo(() => {
    if (!document) return '';
    return format === 'markdown' ? document.markdown : document.plainText;
  }, [document, format]);

  const handleCopy = async () => {
    if (!exportText) return;
    await navigator.clipboard.writeText(exportText);
  };

  const handleDownload = () => {
    if (!exportText) return;
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement('a');
    anchor.href = url;
    anchor.download = format === 'markdown' ? 'signalghost-evidence.md' : 'signalghost-evidence.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="card p-4">
      <div className="mb-4">
        <p className="panel-title">Evidence Export</p>
        <h2 className="mt-2 text-lg font-semibold text-white">Portfolio-ready incident narrative</h2>
        <p className="mt-2 text-sm text-slate-400">
          Submit the current local timeline to the backend formatter. If the backend is unavailable, the app can still present the last successful response already returned.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px,1fr]">
        <form
          className="space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (title.trim().length < 5) return;
            onGenerate(title.trim(), includeMitigations);
          }}
        >
          <div>
            <label htmlFor="evidence-title" className="mb-2 block text-sm font-medium text-slate-200">
              Report title
            </label>
            <input
              id="evidence-title"
              className="input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              minLength={5}
              required
            />
          </div>
          <div>
            <label htmlFor="evidence-mode" className="mb-2 block text-sm font-medium text-slate-200">
              Run mode
            </label>
            <input id="evidence-mode" className="input" value={mode} disabled />
          </div>
          <label className="flex items-start gap-3 rounded-xl border border-slate-800 p-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={includeMitigations}
              onChange={(event) => setIncludeMitigations(event.target.checked)}
              className="mt-1"
            />
            Include mitigation guidance for the scenarios represented in the timeline.
          </label>
          <button type="submit" className="btn-primary w-full" disabled={loading || events.length === 0 || title.trim().length < 5}>
            {loading ? 'Generating…' : 'Generate evidence'}
          </button>
          {events.length === 0 ? <p className="text-sm text-slate-500">Run at least one scenario before generating a narrative.</p> : null}
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        </form>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Export preview</h3>
              <p className="text-sm text-slate-400">Generated text from the backend response.</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className={format === 'markdown' ? 'btn-primary' : 'btn-secondary'} onClick={() => setFormat('markdown')}>
                Markdown
              </button>
              <button type="button" className={format === 'plainText' ? 'btn-primary' : 'btn-secondary'} onClick={() => setFormat('plainText')}>
                Plain text
              </button>
            </div>
          </div>
          {document ? (
            <>
              <div className="mb-3 flex flex-wrap gap-2">
                <button type="button" onClick={handleCopy} className="btn-secondary">
                  Copy
                </button>
                <button type="button" onClick={handleDownload} className="btn-secondary">
                  Download
                </button>
              </div>
              <textarea
                aria-label="Generated evidence export"
                className="min-h-[360px] w-full rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-sm text-slate-200 outline-none"
                readOnly
                value={exportText}
              />
            </>
          ) : (
            <div className="flex min-h-[360px] items-center justify-center rounded-xl border border-dashed border-slate-700 text-sm text-slate-500">
              No evidence generated yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}