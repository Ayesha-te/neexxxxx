import { LoadingSpinner } from "./loading-spinner";

interface DataTableProps<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
  columns: {
    key: keyof T;
    title: string;
    render?: (value: any, item: T) => React.ReactNode;
  }[];
  emptyMessage?: string;
  errorMessage?: string;
}

export function DataTable<T>({
  data,
  loading,
  error,
  columns,
  emptyMessage = "No data available",
  errorMessage = "Failed to load data",
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-4xl">❌</div>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
          <p className="mt-1 text-xs text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-4xl">📋</div>
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50 text-muted-foreground">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-left font-medium"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-t border-border transition-colors hover:bg-accent/30"
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-3">
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
