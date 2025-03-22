"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/tablesUtils/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
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

import { deleteBlastLog } from "@/services/blastService";
import { toast } from "sonner";
import { ViewBlastLogDialog } from "./view-blast-log-dialog";
import { EditBlastLogDialog } from "./edit-blast-log-dialog";


export type BlastLog = {
  id: string;
  tunnelId: string;
  dateTime: string;
  blastLocation: string;
  blastId: string;
  rockType: string;
  groundStability: string;
  waterPresence: string;
  groundTemperature: number;
  numberOfHoles: number;
  holeDepth: number;
  holeDiameter: number;
  holeCondition: string;
  ventilationPlan: boolean;
  areaEvacuated: boolean;
  personnelAccounted: boolean;
  equipmentRemoved: boolean;
  teamLeadSignature?: string;
  teamMembers: string[];
};


export const columns = (refetchData: () => void): ColumnDef<BlastLog>[] => [
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
    accessorKey: "blastId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Blast ID" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("blastId")}</div>
    )
  },
  {
    accessorKey: "blastLocation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => <div>{row.getValue("blastLocation")}</div>
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date & Time" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateTime"));
      return <div>{date.toLocaleString()}</div>;
    }
  },
  {
    accessorKey: "rockType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rock Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("rockType")}</div>
  },
  {
    accessorKey: "groundStability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ground Stability" />
    ),
    cell: ({ row }) => {
      const stability = row.getValue("groundStability") as string;
      let badgeVariant = "outline";

      if (stability === "Stable") {
        badgeVariant = "default";
      } else if (stability === "Unstable") {
        badgeVariant = "destructive";
      }

      return <Badge variant={badgeVariant as any}>{stability}</Badge>;
    }
  },
  {
    accessorKey: "waterPresence",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Water Presence" />
    ),
    cell: ({ row }) => <div>{row.getValue("waterPresence")}</div>
  },
  {
    accessorKey: "numberOfHoles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Holes" />
    ),
    cell: ({ row }) => {
      const numberOfHoles = row.getValue("numberOfHoles") as number;
      const holeDepth = row.original.holeDepth;
      return (
        <div>
          {numberOfHoles} × {holeDepth}m
        </div>
      );
    }
  },
  {
    id: "safetyStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Safety Status" />
    ),
    cell: ({ row }) => {
      const log = row.original;
      const safetyChecks = [
        log.ventilationPlan,
        log.areaEvacuated,
        log.personnelAccounted,
        log.equipmentRemoved
      ];

      const completedChecks = safetyChecks.filter((check) => check).length;
      const percentage = (completedChecks / safetyChecks.length) * 100;

      let badgeVariant = "outline";
      let status = "Incomplete";

      if (percentage === 100) {
        badgeVariant = "default";
        status = "Complete";
      } else if (percentage >= 50) {
        badgeVariant = "secondary";
        status = "Partial";
      } else {
        badgeVariant = "destructive";
      }

      return (
        <Badge variant={badgeVariant as any}>
          {status} ({completedChecks}/{safetyChecks.length})
        </Badge>
      );
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const blastLog = row.original;
      const [open, setOpen] = React.useState(false);
      const [isDeleting, setIsDeleting] = React.useState(false);

      const handleDelete = async () => {
        try {
          setIsDeleting(true);
          await deleteBlastLog(blastLog.id);
          toast.success("Blast log deleted successfully");
          // Simple refresh for now
         refetchData();
        } catch (error) {
          console.error("Error deleting blast log:", error);
          toast.error("Failed to delete blast log");
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
                onClick={() => navigator.clipboard.writeText(blastLog.id)}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ViewBlastLogDialog blastLog={blastLog} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <EditBlastLogDialog
                  blastLog={blastLog}
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
                    Delete log
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this blast log. This action
                      cannot be undone.
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
