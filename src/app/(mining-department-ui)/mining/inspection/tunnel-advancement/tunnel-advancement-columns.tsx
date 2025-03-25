"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/tablesUtils/DataTableColumnHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

import { deleteTunnelAdvancement } from "@/services/tunnelAdvancementService";
import { toast } from "sonner";
import { EditTunnelAdvancementDialog } from "./edit-tunnel-advancement-dialog";

export type TunnelAdvancement = {
  id: string;
  tunnelId: string;
  crosscutId?: string;
  lengthAdvanced: number;
  processType: string;
  faceVideoUrl?: string;
  gradePercentage: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
};

interface ColumnOptions {
  refetch: () => void;
}

export const getColumns = ({
  refetch
}: ColumnOptions): ColumnDef<TunnelAdvancement>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "lengthAdvanced",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Length Advanced" />
    ),
    cell: ({ row }) => <div>{row.getValue("lengthAdvanced")} m</div>
  },
  {
    accessorKey: "processType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Process Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("processType")}</div>
  },
  {
    accessorKey: "gradePercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grade (%)" />
    ),
    cell: ({ row }) => <div>{row.getValue("gradePercentage")} %</div>
  },
  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
    cell: ({ row }) => <div>{row.getValue("note") || "-"}</div>
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const advancement = row.original;
      const [open, setOpen] = React.useState(false);
      const [isDeleting, setIsDeleting] = React.useState(false);

      const handleDelete = async () => {
        try {
          setIsDeleting(true);
          await deleteTunnelAdvancement(advancement.id);
          toast.success("Tunnel advancement deleted successfully");
          refetch(); 
        } catch (error) {
          console.error("Error deleting tunnel advancement:", error);
          toast.error("Failed to delete tunnel advancement");
        } finally {
          setIsDeleting(false);
          setOpen(false);
        }
      };

      return (
        <div className="flex items-center">
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
                onClick={() => navigator.clipboard.writeText(advancement.id)}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <EditTunnelAdvancementDialog
                  advancement={advancement}
                  onUpdateSuccess={refetch} // Use refetch instead of window.location.reload()
                />
              </DropdownMenuItem>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setOpen(true);
                    }}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete advancement
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this tunnel advancement. This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}>
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];
