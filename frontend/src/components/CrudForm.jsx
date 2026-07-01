export default function CrudForm({
  fields = [],
  values = {},
  onChange,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar'
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {fields.map((field) => {
        if (field.type === 'select') {
          return (
            <select
              key={field.name}
              name={field.name}
              value={values[field.name] ?? ''}
              onChange={onChange}
              className="border rounded-lg px-3 py-2"
              required={field.required}
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        }

        return (
          <input
            key={field.name}
            name={field.name}
            type={field.type || 'text'}
            step={field.step}
            value={values[field.name] ?? ''}
            onChange={onChange}
            placeholder={field.placeholder}
            className={field.className || 'border rounded-lg px-3 py-2'}
            required={field.required}
          />
        );
      })}

      <div className="md:col-span-3 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}