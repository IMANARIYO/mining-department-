"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
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

import { deleteIncidentReport } from "@/services/incidentReportService";
import { toast } from "sonner";
import { EditIncidentReportDialog } from "./edit-incident-report-dialog";
import { ViewIncidentReport } from "./view-incident-report-dialog";


export type IncidentReport = {
  id: string;
  tunnelId: string;
  incidentType: string;
  peopleInvolved: string;
  rootCauseAnalysis: string;
  measuresTaken: string;
  createdAt: string;
  updatedAt: string;
};

interface ColumnOptions {
  refetch: () => void;
}

export const getColumns = ({
  refetch
}: ColumnOptions): ColumnDef<IncidentReport>[] => [
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
    accessorKey: "incidentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Incident Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("incidentType")}</div>
  },
  {
    accessorKey: "peopleInvolved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="People Involved" />
    ),
    cell: ({ row }) => <div>{row.getValue("peopleInvolved")}</div>
  },
  {
    accessorKey: "rootCauseAnalysis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Root Cause Analysis" />
    ),
    cell: ({ row }) => (
      <div
        className="max-w-md truncate"
        title={row.getValue("rootCauseAnalysis")}>
        {row.getValue("rootCauseAnalysis") || "-"}
      </div>
    )
  },
  {
    accessorKey: "measuresTaken",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Measures Taken" />
    ),
    cell: ({ row }) => (
      <div className="max-w-md truncate" title={row.getValue("measuresTaken")}>
        {row.getValue("measuresTaken") || "-"}
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Reported" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleDateString()}</div>;
    }
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
          await deleteIncidentReport(report.id);
          toast.success("Incident report deleted successfully");
          refetch();
        } catch (error) {
          console.error("Error deleting incident report:", error);
          toast.error("Failed to delete incident report");
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
               <DropdownMenuItem asChild>
              <ViewIncidentReport
                report={report}
                trigger={
                  <div className="flex items-center cursor-pointer w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    View details
                  </div>
                }
              />
            </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <EditIncidentReportDialog
                  report={report}
                  onUpdateSuccess={refetch}
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
                      This will permanently delete this incident report. This
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
