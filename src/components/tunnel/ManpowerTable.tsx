// components/tunnel/ManpowerTable.tsx
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Checkbox } from "@/components/ui/checkbox";

import DataTable from "./DataTable";
import { ManpowerItem } from "@/resources/types";

interface ManpowerTableProps {
  data: ManpowerItem[];
  onTogglePresence: (id: string) => void;
  onAddClick?: () => void;
}

const ManpowerTable: React.FC<ManpowerTableProps> = ({
  data,
  onTogglePresence,
  onAddClick
}) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", hideable: false, width: 20 },
    {
      field: "warning",
      headerName: "Warning",
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: params.value.status ? "#FFD700" : "transparent", // Yellow if warning
            color: params.value.status ? "black" : "inherit",
            padding: "5px",
            borderRadius: "4px"
          }}>
          {params.value.status ? `⚠ ${params.value.message}` : "✅ Safe"}
        </div>
      ),
      width: 200
    },
    { field: "name", headerName: "Name", type: "string", width: 200 },
    { field: "role", headerName: "Role", type: "string" },
    { field: "location", headerName: "Location", type: "string", width: 200 },
    {
      field: "present",
      headerName: "Present",
      renderCell: (params) => (
        <Checkbox
          checked={params.row.present}
          onCheckedChange={() => onTogglePresence(params.row.id)}
        />
      )
    }
  ];

  return (
    <DataTable 
      title="Roll Call Manpower on Site "
      columns={columns}
      rows={data}
      onAddClick={onAddClick}
    />
  );
};

export default ManpowerTable;
