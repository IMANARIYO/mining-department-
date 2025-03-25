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

import { deleteProductionReport } from "@/services/productionReportService";
import { toast } from "sonner";
import { ViewProductionReportDialog } from "./view-production-report-dialog";
import { EditProductionReportDialog } from "./edit-production-report-dialog";

export type ProductionReport = {
  id: string;
  tunnelId: string;
  dailyPlan: number;
  bookedMeter: number;
  actualMeter: number;
  variance: number;
  materialExcavated: number;
  wasteExcavated: number;
  createdAt: string;
  updatedAt?: string;
};

export const productionReportcolumns = ({
  refetchData
}: {
  refetchData: () => void;
}): ColumnDef<ProductionReport>[] => [
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleDateString()}</div>;
    }
  },
  {
    accessorKey: "dailyPlan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Daily Plan (m)" />
    ),
    cell: ({ row }) => <div>{row.getValue("dailyPlan")} m</div>
  },
  {
    accessorKey: "bookedMeter",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booked Meter (m)" />
    ),
    cell: ({ row }) => <div>{row.getValue("bookedMeter")} m</div>
  },
  {
    accessorKey: "actualMeter",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actual Meter (m)" />
    ),
    cell: ({ row }) => <div>{row.getValue("actualMeter")} m</div>
  },
  {
    accessorKey: "variance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variance (m)" />
    ),
    cell: ({ row }) => <div>{row.getValue("variance")} m</div>
  },
  {
    accessorKey: "materialExcavated",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Material Excavated (Tons)"
      />
    ),
    cell: ({ row }) => <div>{row.getValue("materialExcavated")} T</div>
  },
  {
    accessorKey: "wasteExcavated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waste Excavated (Tons)" />
    ),
    cell: ({ row }) => <div>{row.getValue("wasteExcavated")} T</div>
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const report = row.original;
      const [open, setOpen] = React.useState(false);
      const [isDeleting, setIsDeleting] = React.useState(false);

      const handleDelete = async () => {
        try {
          setIsDeleting(true);
          await deleteProductionReport(report.id);
          toast.success("Production report deleted successfully");
          refetchData();
        } catch (error) {
          console.error("Error deleting production report:", error);
          toast.error("Failed to delete production report");
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
                onClick={() => navigator.clipboard.writeText(report.id)}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ViewProductionReportDialog report={report} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditProductionReportDialog
                  report={report}
                  onSuccess={refetchData}
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
                    Delete report
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this production report. This
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
