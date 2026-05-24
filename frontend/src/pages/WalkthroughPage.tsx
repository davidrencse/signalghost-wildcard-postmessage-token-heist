import { DocsPage } from './DocsPage';

export function WalkthroughPage() {
  return (
    <DocsPage
      eyebrow="Walkthrough"
      title="Compare vulnerable and hardened flows"
      intro="Use the simulation dashboard to replay the same message patterns under different validation assumptions and inspect the timeline and evidence output."
    >
      <article className="card p-6">
        <h3 className="text-xl font-semibold text-white">Vulnerable flow</h3>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-300">
          <li>Open the Simulation page and leave the mode set to vulnerable.</li>
          <li>Run the fake token exposure, refund approval, and note tampering cards.</li>
          <li>Observe the victim widget mutating fake state after the backend reports acceptance.</li>
          <li>Review the timeline for sender, receiver, claimed origin, and impact details.</li>
        </ol>
      </article>
      <article className="card p-6">
        <h3 className="text-xl font-semibold text-white">Hardened flow</h3>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-300">
          <li>Switch to hardened mode to require strict origin, schema, nonce, and action checks.</li>
          <li>Rerun the same attack cards.</li>
          <li>Observe that widget state remains unchanged when the backend rejects the message.</li>
          <li>Inspect failed checks in the timeline to see the exact reason for rejection.</li>
        </ol>
      </article>
      <article className="card p-6">
        <h3 className="text-xl font-semibold text-white">Evidence generation</h3>
        <p className="mt-4 text-sm text-slate-300">
          After a run, generate an incident narrative from the timeline. The backend returns a deterministic report without storing the submitted events.
        </p>
      </article>
    </DocsPage>
  );
}