// components/tunnel/DataTable.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  title: string;
  onAddClick?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  title,
  onAddClick
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>
        <Button variant="outline" size="icon" onClick={onAddClick}>
          <span className="text-xl">+</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            pageSizeOptions={[2, 5, 10, 25, 50, 100, 200]}
            disableRowSelectionOnClick
            getRowClassName={(params) =>
              params.row.warning?.status
                ? "bg-red-500 text-white"
                : "bg-green-200"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
