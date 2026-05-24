import type { TimelineEvent } from '../types';
import { TimelineEventRow } from './TimelineEventRow';

interface MessageTimelineProps {
  events: TimelineEvent[];
  expanded: boolean;
  onToggleExpanded: () => void;
  onClear: () => void;
}

export function MessageTimeline({ events, expanded, onToggleExpanded, onClear }: MessageTimelineProps) {
  const visibleEvents = expanded ? events : events.slice(0, 5);

  return (
    <section className="card p-4">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="panel-title">Message Timeline</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Chronological event stream</h2>
          <p className="mt-2 text-sm text-slate-400">Every sent message, validation outcome, rejection reason, and accepted UI impact appears here.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onToggleExpanded} className="btn-secondary">
            {expanded ? 'Collapse' : 'Expand'}
          </button>
          <button type="button" onClick={onClear} className="btn-secondary" disabled={events.length === 0}>
            Clear timeline
          </button>
        </div>
      </div>
      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 p-6 text-sm text-slate-400">
          No events recorded yet. Run one of the attack cards to populate the timeline.
        </div>
      ) : (
        <div className="space-y-3">
          {visibleEvents.map((event) => (
            <TimelineEventRow key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}