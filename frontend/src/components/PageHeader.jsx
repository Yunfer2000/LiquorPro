export default function PageHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        {subtitle && <p className="text-slate-500">{subtitle}</p>}
      </div>

      {actionLabel && (
        <button
          onClick={onAction}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}