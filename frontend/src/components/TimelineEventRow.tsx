import type { TimelineEvent } from '../types';
import { formatTimestamp } from '../utils/formatters';
import { ValidationBadge } from './ValidationBadge';

interface TimelineEventRowProps {
  event: TimelineEvent;
}

export function TimelineEventRow({ event }: TimelineEventRowProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <ValidationBadge status={event.validationResult} />
            <span className="text-xs text-slate-500">{formatTimestamp(event.timestamp)}</span>
            {event.scenarioId ? <span className="badge border-slate-700 bg-slate-900 text-slate-300">{event.scenarioId}</span> : null}
          </div>
          <p className="text-sm text-slate-200">
            <span className="font-medium text-cyan-300">{event.sender}</span> → <span className="font-medium text-cyan-300">{event.receiver}</span>
          </p>
          <p className="text-sm text-slate-400">Origin: {event.claimedOrigin}</p>
          <p className="text-sm text-slate-400">Action: {event.action}</p>
          <p className="text-sm text-slate-200">Impact: {event.impact}</p>
          <p className="text-sm text-slate-400">{event.details}</p>
        </div>
        {event.failedChecks.length > 0 ? (
          <div className="min-w-[200px] rounded-xl border border-rose-900/50 bg-rose-950/20 p-3 text-sm text-rose-200">
            <p className="font-medium">Failed checks</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {event.failedChecks.map((check, index) => (
                <li key={`${event.id}-${check}-${index}`}>{check}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}