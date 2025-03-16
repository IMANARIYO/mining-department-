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
  [key: string]: any;
};

type DataTableProps = {
  columns: string[];
  rows: RowData[];
  actions?: (row: RowData) => JSX.Element[];
  loading: boolean;
  title: string;
};


const DataTable = ({
  columns,
  rows,
  actions,
  loading,
  title
}: DataTableProps) => {
  return (
    <div className="mt-8 ">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="rounded-md border  w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column} className="p-2 text-sm md:text-base">
                    {column}
                  </TableHead>
                ))}
                {actions && (
                  <TableHead className="p-2 text-sm md:text-base">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} className="border-b">
                  {columns.map((column) => (
                    <TableCell key={column} className="p-2 text-sm">
                      {row[column]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="p-2">
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
