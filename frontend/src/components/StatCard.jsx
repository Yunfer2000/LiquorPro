export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">{value}</h2>
        </div>

        <div className="text-3xl text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}