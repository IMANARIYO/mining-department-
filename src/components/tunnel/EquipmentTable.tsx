// components/tunnel/EquipmentTable.tsx
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, CheckCircle } from "lucide-react";

import DataTable from "./DataTable";
import { EquipmentItem } from "@/resources/types";

interface EquipmentTableProps {
  data: EquipmentItem[];
  onTogglePresence: (id: string) => void;
  onAddClick?: () => void;
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({
  data,
  onTogglePresence,
  onAddClick
}) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", hideable: false },
    {
      field: "warning",
      headerName: "Warning",
      renderCell: (params) => {
        if (params.value?.status) {
          return (
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} />
              <span className="text-red-500">{params.value.message}</span>
            </div>
          );
        } else {
          return (
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <span className="text-green-500">No Warning</span>
            </div>
          );
        }
      }
    },
    { field: "equipment", headerName: "Equipment", type: "string" },
    { field: "number", headerName: "Number", type: "string" },
    { field: "location", headerName: "Location", type: "string" },
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
      title="Equipment"
      columns={columns}
      rows={data}
      onAddClick={onAddClick}
    />
  );
};

export default EquipmentTable;
