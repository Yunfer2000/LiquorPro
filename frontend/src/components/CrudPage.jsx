import DashboardLayout from '../layouts/DashboardLayout';
import PageHeader from './PageHeader';
import SearchFilters from './SearchFilters';
import DataTable from './DataTable';
import Loading from './Loading';

export default function CrudPage({
  title,
  subtitle,
  actionLabel,
  onAction,
  loading = false,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  filters = [],
  onClearFilters,
  columns = [],
  data = [],
  emptyMessage = 'No hay registros'
}) {
  if (loading) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actionLabel={actionLabel}
        onAction={onAction}
      />

      <SearchFilters
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
        filters={filters}
        onClear={onClearFilters}
      />

      <DataTable
        columns={columns}
        data={data}
        emptyMessage={emptyMessage}
      />
    </DashboardLayout>
  );
}