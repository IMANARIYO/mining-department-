"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import type { TunnelDimension } from "./tunnel-dimension-columns";

interface ViewTunnelDimensionDialogProps {
  dimension: TunnelDimension;
}

export function ViewTunnelDimensionDialog({
  dimension
}: ViewTunnelDimensionDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center w-full">
          <Eye className="mr-2 h-4 w-4" />
          View details
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tunnel Dimension Details</DialogTitle>
          <DialogDescription>
            Detailed information about this tunnel dimension.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Main Axis Length:</span>
            <span>{dimension.mainAxisLength} m</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Grade Percentage:</span>
            <span>{dimension.gradePercentage}%</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Design Profile Type:</span>
            <span>{dimension.designProfileType}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Height Dimensions:</span>
            <span>{dimension.heightDimensions} m</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Width Dimensions:</span>
            <span>{dimension.widthDimensions} m</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Cross-Section Area:</span>
            <span>{dimension.crossSectionArea} m²</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Created At:</span>
            <span>{new Date(dimension.createdAt).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Last Updated:</span>
            <span>{new Date(dimension.updatedAt).toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
