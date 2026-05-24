import type { AttackScenario, EvidenceDocument, EvidenceFinding, EvidenceMode, TimelineEvent } from '../types';

export function buildLocalEvidence(
  title: string,
  mode: EvidenceMode,
  events: TimelineEvent[],
  scenarios: AttackScenario[],
  includeMitigations: boolean,
): EvidenceDocument {
  const findings: EvidenceFinding[] = scenarios
    .filter((scenario) => events.some((event) => event.scenarioId === scenario.id))
    .map((scenario) => ({
      scenarioId: scenario.id,
      finding: `${scenario.title} was simulated in ${mode} mode using a fake message flow.`,
      impact: scenario.vulnerableImpact,
      mitigation: includeMitigations ? scenario.defenseNotes.join(' ') : 'Mitigations omitted from this export.',
    }));

  const executiveSummary = `This evidence package summarizes ${events.length} simulated timeline events generated during a local postMessage trust-boundary demonstration. The run operated in ${mode} mode and used fake bundled assets only.`;
  const timelineNarrative = events
    .map((event) => `[${event.timestamp}] ${event.sender} -> ${event.receiver} ${event.action}: ${event.validationResult}. ${event.impact}. ${event.details}`)
    .join('\n');
  const safeScopeNotice = 'Safe scope: all users, tokens, notes, receipts, and origins in this report are fake and contained within the educational simulation.';
  const plainText = `${title}\n\n${executiveSummary}\n\nTimeline\n${timelineNarrative}\n\n${safeScopeNotice}`;
  const markdown = `# ${title}\n\n## Executive Summary\n${executiveSummary}\n\n## Timeline Narrative\n\n${events
    .map((event) => `- **${event.timestamp}** ${event.sender} -> ${event.receiver} | \`${event.action}\` | ${event.validationResult} | ${event.impact}`)
    .join('\n')}\n\n## Findings\n${findings
    .map((finding) => `- **${finding.finding}** Impact: ${finding.impact} Mitigation: ${finding.mitigation}`)
    .join('\n')}\n\n> ${safeScopeNotice}`;

  return {
    title,
    generatedAt: new Date().toISOString(),
    executiveSummary,
    timelineNarrative,
    findings,
    safeScopeNotice,
    plainText,
    markdown,
  };
}