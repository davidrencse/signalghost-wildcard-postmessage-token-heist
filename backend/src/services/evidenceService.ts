import { EvidenceDocument, TimelineEvent } from '../types';

export const generateEvidence = (payload: {
  title: string;
  events: TimelineEvent[];
  includeMitigations: boolean;
}): EvidenceDocument => {
  const evidence: EvidenceDocument = {
    title: payload.title,
    generatedAt: new Date().toISOString(),
    executiveSummary: 'Summary of events',
    timelineNarrative: 'Detailed narrative...',
    findings: [],
    safeScopeNotice: 'All data is fake and used for demonstration.',
    plainText: 'Plain text version',
    markdown: 'Markdown version'
  };
  // Create evidence from events
  return evidence;
};