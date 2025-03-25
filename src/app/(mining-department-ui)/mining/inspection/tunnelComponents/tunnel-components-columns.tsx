"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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

import { deleteTunnelComponent } from "@/services/tunnelComponentService";
import { toast } from "sonner";
import { DataTableColumnHeader } from "@/components/tablesUtils/DataTableColumnHeader";
import { EditTunnelComponentDialog } from "./edit-tunnel-component-dialog";
import { ViewTunnelComponentDialog } from "./view-tunnel-component-dialog";

// This type is used to define the shape of our data.
export type TunnelComponent = {
  id: string;
  tunnelId: string;
  componentType: string;
  distanceFromEntry: string;
  length: string;
  deviationAngle: string;
  widthDimensions: string;
  heightDimensions: string;
  supported: boolean;
  gradePercentage: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<TunnelComponent>[] = [
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
    accessorKey: "componentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Component Type" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("componentType")}</div>
    )
  },
  {
    accessorKey: "distanceFromEntry",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance From Entry" />
    ),
    cell: ({ row }) => <div>{row.getValue("distanceFromEntry")}</div>
  },
  {
    accessorKey: "length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Length" />
    ),
    cell: ({ row }) => <div>{row.getValue("length")}</div>
  },
  {
    accessorKey: "deviationAngle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deviation Angle" />
    ),
    cell: ({ row }) => <div>{row.getValue("deviationAngle")}</div>
  },
  {
    accessorKey: "widthDimensions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Width" />
    ),
    cell: ({ row }) => <div>{row.getValue("widthDimensions")}</div>
  },
  {
    accessorKey: "heightDimensions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Height" />
    ),
    cell: ({ row }) => <div>{row.getValue("heightDimensions")}</div>
  },
  {
    accessorKey: "supported",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supported" />
    ),
    cell: ({ row }) => <div>{row.getValue("supported") ? "Yes" : "No"}</div>
  },
  {
    accessorKey: "gradePercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grade (%)" />
    ),
    cell: ({ row }) => <div>{row.getValue("gradePercentage")}</div>
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tunnelComponent = row.original;
      const [open, setOpen] = React.useState(false);
      const [isDeleting, setIsDeleting] = React.useState(false);

      const handleDelete = async () => {
        try {
          setIsDeleting(true);
          await deleteTunnelComponent(tunnelComponent.id);
          toast.success("Tunnel component deleted successfully");
          // You would typically refresh the data here
          // This would be handled by the parent component
          window.location.reload(); // Simple refresh for now
        } catch (error) {
          console.error("Error deleting tunnel component:", error);
          toast.error("Failed to delete tunnel component");
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
                onClick={() =>
                  navigator.clipboard.writeText(tunnelComponent.id)
                }>
                Copy component ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem> */}
              <DropdownMenuItem asChild>
                <ViewTunnelComponentDialog tunnelComponent={tunnelComponent} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditTunnelComponentDialog
                  tunnelComponent={tunnelComponent}
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
                    Delete component
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the tunnel component of type
                      "{tunnelComponent.componentType}". This action cannot be
                      undone.
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
