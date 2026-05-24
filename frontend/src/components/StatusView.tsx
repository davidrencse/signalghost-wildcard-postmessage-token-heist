interface StatusViewProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function StatusView({ title, message, actionLabel, onAction }: StatusViewProps) {
  return (
    <div className="card flex min-h-[220px] flex-col items-center justify-center p-8 text-center">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-3 max-w-xl text-sm text-slate-400">{message}</p>
      {actionLabel && onAction ? (
        <button type="button" onClick={onAction} className="btn-primary mt-5">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}