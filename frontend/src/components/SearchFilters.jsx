export default function SearchFilters({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  filters = [],
  onClear
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {filters.map((filter) => (
          <select
            key={filter.name}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">{filter.defaultLabel}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}

        <button
          onClick={onClear}
          className="border border-slate-300 rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}