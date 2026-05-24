import type { ScenarioCategory, ValidationStatus } from '../types';

export function formatTimestamp(value: string): string {
  return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function categoryLabel(category: ScenarioCategory): string {
  switch (category) {
    case 'token_exposure':
      return 'Token Exposure';
    case 'refund_abuse':
      return 'Refund Abuse';
    case 'note_tampering':
      return 'Note Tampering';
  }
}

export function statusLabel(status: ValidationStatus): string {
  if (status === 'accepted') return 'Accepted';
  if (status === 'rejected') return 'Rejected';
  return 'Informational';
}

export function truncateMiddle(value: string, start = 8, end = 6): string {
  if (value.length <= start + end + 3) return value;
  return `${value.slice(0, start)}...${value.slice(-end)}`;
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}