import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { JSX } from "react";

type RowData = {
  [key: string]: any; // A generic structure for row data
};

type DataTableProps = {
  columns: string[]; // Column names
  rows: RowData[]; // Data rows to display
  actions?: (row: RowData) => JSX.Element[]; // Actions like edit, delete, etc.
  loading: boolean; // Loading state
  title: string; // Table title
};

const DataTable = ({
  columns,
  rows,
  actions,
  loading,
  title
}: DataTableProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {/* Dynamically render column headers */}
                {columns.map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
                {/* Add an actions column if actions are provided */}
                {actions && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Render table rows dynamically */}
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column}>
                      {row[column]} {/* Dynamically render row data */}
                    </TableCell>
                  ))}
                  {/* Render actions column if actions are provided */}
                  {actions && (
                    <TableCell>
                      {actions(row).map((action, idx) => (
                        <div key={idx} className="mr-2 inline-block">
                          {action}
                        </div>
                      ))}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
