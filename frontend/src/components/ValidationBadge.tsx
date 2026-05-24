import type { ValidationStatus } from '../types';
import { statusLabel } from '../utils/formatters';

interface ValidationBadgeProps {
  status: ValidationStatus;
}

export function ValidationBadge({ status }: ValidationBadgeProps) {
  const classes =
    status === 'accepted'
      ? 'border-emerald-700 bg-emerald-500/10 text-emerald-300'
      : status === 'rejected'
        ? 'border-rose-700 bg-rose-500/10 text-rose-300'
        : 'border-slate-700 bg-slate-500/10 text-slate-300';

  return <span className={`badge ${classes}`}>{statusLabel(status)}</span>;
}