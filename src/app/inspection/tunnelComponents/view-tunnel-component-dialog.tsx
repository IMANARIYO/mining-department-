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
import { TunnelComponent } from "./tunnel-components-columns";


interface ViewTunnelComponentDialogProps {
  tunnelComponent: TunnelComponent;
}

export function ViewTunnelComponentDialog({
  tunnelComponent
}: ViewTunnelComponentDialogProps) {
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
          <DialogTitle>Tunnel Component Details</DialogTitle>
          <DialogDescription>
            Detailed information about this tunnel component.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Component Type:</span>
            <span>{tunnelComponent.componentType}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Distance From Entry:</span>
            <span>{tunnelComponent.distanceFromEntry}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Length:</span>
            <span>{tunnelComponent.length}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Deviation Angle:</span>
            <span>{tunnelComponent.deviationAngle}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Width Dimensions:</span>
            <span>{tunnelComponent.widthDimensions}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Height Dimensions:</span>
            <span>{tunnelComponent.heightDimensions}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Supported:</span>
            <span>{tunnelComponent.supported ? "Yes" : "No"}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Grade Percentage:</span>
            <span>{tunnelComponent.gradePercentage}%</span>
          </div>
          {tunnelComponent.note && (
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="font-medium">Note:</span>
              <span>{tunnelComponent.note}</span>
            </div>
          )}
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Created At:</span>
            <span>{new Date(tunnelComponent.createdAt).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-medium">Last Updated:</span>
            <span>{new Date(tunnelComponent.updatedAt).toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
