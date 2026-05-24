import { DocsPage } from './DocsPage';

export function ThreatModelPage() {
  return (
    <DocsPage
      eyebrow="Threat Model"
      title="Actors, trust boundaries, and fake assets"
      intro="This page describes the local simulation model used by SignalGhost. The rogue parent page and the embedded checkout widget are both controlled artifacts rendered inside the app for defensive education only."
    >
      <article className="card p-6">
        <h3 className="text-xl font-semibold text-white">Actors</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>Rogue parent page: an untrusted controller that sends crafted mock messages.</li>
          <li>Victim checkout widget: a fake iframe-style target that should validate message provenance and content.</li>
          <li>User observer: the learner who compares vulnerable and hardened outcomes.</li>
        </ul>
      </article>
      <article className="card p-6">
        <h3 className="text-xl font-semibold text-white">Trust boundaries</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>Origin trust: whether the widget accepts messages from only expected origins.</li>
          <li>Schema trust: whether payload shape and required fields are validated before use.</li>
          <li>Action trust: whether only approved actions can reach mutation logic.</li>
          <li>Nonce trust: whether message pairing prevents stale or injected requests.</li>
        </ul>
      </article>
      <article className="card p-6">
        <h3 className="text-xl font-semibold text-white">Fake assets</h3>
        <p className="mt-4 text-sm text-slate-300">
          Every token, receipt ID, origin, user reference, refund state, and account note in this project is fake and bundled. No real browser frame, real payment flow, or external endpoint is embedded or targeted.
        </p>
      </article>
    </DocsPage>
  );
}