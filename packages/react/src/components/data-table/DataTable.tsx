import { useMemo, useState, type ReactNode } from "react";
import "./data-table.css";

export type DataTableSortDirection = "ascending" | "descending";

export interface DataTableColumn<Row> {
  id: string;
  header: ReactNode;
  cell: (row: Row, rowIndex: number) => ReactNode;
  sortValue?: (row: Row) => string | number;
  rowHeader?: boolean;
}

export interface DataTableProps<Row> {
  caption: ReactNode;
  columns: DataTableColumn<Row>[];
  data: Row[];
  getRowId?: (row: Row, rowIndex: number) => string | number;
  emptyMessage?: ReactNode;
  className?: string;
}

interface SortState {
  columnId: string;
  direction: DataTableSortDirection;
}

/** A semantic data table with optional client-side sorting for sortable columns. */
export function DataTable<Row>({
  caption,
  columns,
  data,
  getRowId,
  emptyMessage = "No rows to display.",
  className = "",
}: DataTableProps<Row>) {
  const [sort, setSort] = useState<SortState | null>(null);
  const collator = useMemo(() => new Intl.Collator(undefined, { numeric: true, sensitivity: "base" }), []);
  const sortedRows = useMemo(() => {
    if (!sort) return data.map((row, index) => ({ row, index }));
    const column = columns.find((candidate) => candidate.id === sort.columnId);
    if (!column?.sortValue) return data.map((row, index) => ({ row, index }));

    return data
      .map((row, index) => ({ row, index }))
      .sort((a, b) => {
        const aValue = column.sortValue?.(a.row) ?? "";
        const bValue = column.sortValue?.(b.row) ?? "";
        const result = typeof aValue === "number" && typeof bValue === "number"
          ? aValue - bValue
          : collator.compare(String(aValue), String(bValue));
        return (sort.direction === "ascending" ? result : -result) || a.index - b.index;
      });
  }, [collator, columns, data, sort]);

  const toggleSort = (columnId: string) => {
    setSort((current) => current?.columnId === columnId
      ? { columnId, direction: current.direction === "ascending" ? "descending" : "ascending" }
      : { columnId, direction: "ascending" });
  };

  return (
    <div className={`hobiui-data-table-wrap ${className}`.trim()}>
      <table className="hobiui-data-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => {
              const direction = sort?.columnId === column.id ? sort.direction : undefined;
              return (
                <th key={column.id} scope="col" aria-sort={direction}>
                  {column.sortValue ? (
                    <button className="hobiui-data-table__sort" type="button" onClick={() => toggleSort(column.id)}>
                      {column.header}
                      <span aria-hidden="true">{direction === "ascending" ? " ↑" : direction === "descending" ? " ↓" : " ↕"}</span>
                    </button>
                  ) : column.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr><td className="hobiui-data-table__empty" colSpan={Math.max(columns.length, 1)}>{emptyMessage}</td></tr>
          ) : sortedRows.map(({ row, index }) => (
            <tr key={getRowId ? getRowId(row, index) : index}>
              {columns.map((column) => {
                const content = column.cell(row, index);
                return column.rowHeader
                  ? <th scope="row" key={column.id}>{content}</th>
                  : <td key={column.id}>{content}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
