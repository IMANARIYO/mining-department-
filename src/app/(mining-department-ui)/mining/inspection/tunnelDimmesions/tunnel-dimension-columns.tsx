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

import { deleteTunnelDimension } from "@/services/tunnelDimensionService";
import { toast } from "sonner";
import { ViewTunnelDimensionDialog } from "./view-tunnel-dimension-dialog";
import { EditTunnelDimensionDialog } from "./edit-tunnel-dimension-dialog";

// This type is used to define the shape of our data.
export type TunnelDimension = {
  id: string;
  tunnelId: string;
  mainAxisLength: number;
  gradePercentage: number;
  designProfileType: string;
  heightDimensions: number;
  widthDimensions: number;
  crossSectionArea: number;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<TunnelDimension>[] = [
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
    accessorKey: "mainAxisLength",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Main Axis Length" />
    ),
    cell: ({ row }) => <div>{row.getValue("mainAxisLength")} m</div>
  },
  {
    accessorKey: "gradePercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grade (%)" />
    ),
    cell: ({ row }) => <div>{row.getValue("gradePercentage")}%</div>
  },
  {
    accessorKey: "designProfileType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Design Profile Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("designProfileType")}</div>
  },
  {
    accessorKey: "heightDimensions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Height" />
    ),
    cell: ({ row }) => <div>{row.getValue("heightDimensions")} m</div>
  },
  {
    accessorKey: "widthDimensions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Width" />
    ),
    cell: ({ row }) => <div>{row.getValue("widthDimensions")} m</div>
  },
  {
    accessorKey: "crossSectionArea",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cross-Section Area" />
    ),
    cell: ({ row }) => <div>{row.getValue("crossSectionArea")} m²</div>
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const dimension = row.original;
      const [open, setOpen] = React.useState(false);
      const [isDeleting, setIsDeleting] = React.useState(false);

      const handleDelete = async () => {
        try {
          setIsDeleting(true);
          await deleteTunnelDimension(dimension.id);
          toast.success("Tunnel dimension deleted successfully");
          // You would typically refresh the data here
          // This would be handled by the parent component
          window.location.reload(); // Simple refresh for now
        } catch (error) {
          console.error("Error deleting tunnel dimension:", error);
          toast.error("Failed to delete tunnel dimension");
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
                onClick={() => navigator.clipboard.writeText(dimension.id)}>
                Copy dimension ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ViewTunnelDimensionDialog dimension={dimension} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditTunnelDimensionDialog
                  dimension={dimension}
                  onSuccess={() => window.location.reload()}
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
                    Delete dimension
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this tunnel dimension. This
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
