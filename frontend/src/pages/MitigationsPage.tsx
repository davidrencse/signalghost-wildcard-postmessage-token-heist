import { DocsPage } from './DocsPage';

export function MitigationsPage() {
  return (
    <DocsPage
      eyebrow="Mitigations"
      title="Secure iframe messaging practices"
      intro="The hardened mode in SignalGhost demonstrates several defensive controls that should be combined rather than treated as interchangeable."
    >
      <article className="card p-6">
        <h3 className="text-xl font-semibold text-white">Origin verification</h3>
        <p className="mt-4 text-sm text-slate-300">
          Check the event origin against a strict allowlist. Never accept wildcard trust for sensitive actions or secrets.
        </p>
      </article>
      <article className="card p-6">
        <h3 className="text-xl font-semibold text-white">Schema validation</h3>
        <p className="mt-4 text-sm text-slate-300">
          Validate message action names and payload structure before branching into business logic. Reject malformed or partial payloads by default.
        </p>
      </article>
      <article className="card p-6">
        <h3 className="text-xl font-semibold text-white">Nonce pairing and action allowlists</h3>
        <p className="mt-4 text-sm text-slate-300">
          Require a trusted nonce or challenge-response pair and restrict message handling to a narrow list of expected actions. Fail closed whenever validation context is missing.
        </p>
      </article>
      <article className="card p-6">
        <h3 className="text-xl font-semibold text-white">Static hosting caveat</h3>
        <p className="mt-4 text-sm text-slate-300">
          Client-side checks are useful for teaching concepts, but real systems must also enforce server-side authorization and avoid exposing secrets to the browser in the first place.
        </p>
      </article>
    </DocsPage>
  );
}