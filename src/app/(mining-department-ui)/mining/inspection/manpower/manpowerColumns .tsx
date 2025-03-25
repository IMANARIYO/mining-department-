"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { DataTableColumnHeader } from "@/components/tablesUtils/DataTableColumnHeader";

// Define the shape of a Manpower record
export interface ManpowerRecord {
  id: string;
  name: string;
  role: string;
  location: string;
  warning?: {
    status: boolean;
    message: string;
  };
  present: boolean;
}

// Column generation function that accepts refetch and action methods
export const manpowerColumns = ({
  refetchData,
  onDelete,
  onUpdate,
}: {
  refetchData: () => void;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, data: Partial<ManpowerRecord>) => Promise<void>;
}) => {
  const columns: ColumnDef<ManpowerRecord>[] = [

    {
      accessorKey: "warning",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Warning" />
      ),
      cell: ({ row }) => {
        const warning = row.getValue("warning") as {
          status: boolean;
          message: string;
        };

        if (warning?.status) {
          return (
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} />
              <span className="text-red-500">{warning.message}</span>
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
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("location")}</div>
      ),
    },
    {
      accessorKey: "present",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Present" />
      ),
      cell: ({ row }) => <div>{row.getValue("present") ? "Yes" : "No"}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const manpower = row.original;

        const handleDelete = async () => {
          try {
            await onDelete(manpower.id);
            toast.success("Manpower record deleted successfully");
            refetchData();
          } catch (error) {
            console.error("Failed to delete manpower record:", error);
            toast.error("Failed to delete manpower record");
          }
        };

        const handleTogglePresence = async () => {
          try {
            await onUpdate(manpower.id, {
              present: !manpower.present,
            });
            toast.success("Presence updated successfully");
            refetchData();
          } catch (error) {
            console.error("Failed to update presence:", error);
            toast.error("Failed to update presence");
          }
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleTogglePresence()}
                className="cursor-pointer"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Toggle Presence
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="cursor-pointer text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
