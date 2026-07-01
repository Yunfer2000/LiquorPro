import Modal from './Modal';
import CrudForm from './CrudForm';

export default function CrudModal({
  open,
  title,
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar'
}) {
  if (!open) return null;

  return (
    <Modal title={title} onClose={onCancel}>
      <CrudForm
        fields={fields}
        values={values}
        onChange={onChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
        submitLabel={submitLabel}
      />
    </Modal>
  );
}