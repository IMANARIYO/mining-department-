"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, VideoIcon } from "lucide-react";
import { format } from "date-fns";

type ViewTunnelAdvancementDialogProps = {
  advancement: any;
  trigger?: React.ReactNode;
};

export function ViewTunnelAdvancementDialog({
  advancement,
  trigger
}: ViewTunnelAdvancementDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Eye className="h-4 w-4" />
          <span className="sr-only">View</span>
        </Button>
      )}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tunnel Advancement Details</DialogTitle>
          <DialogDescription>
            View the details of this tunnel advancement.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Tunnel</p>
            <p className="text-sm text-muted-foreground">
              {advancement.tunnelName}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Crosscut</p>
            <p className="text-sm text-muted-foreground">
              {advancement.crosscutName || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Length Advanced</p>
            <p className="text-sm text-muted-foreground">
              {advancement.lengthAdvanced} m
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Process Type</p>
            <p className="text-sm text-muted-foreground">
              {advancement.processType}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Grade Percentage</p>
            <p className="text-sm text-muted-foreground">
              {advancement.gradePercentage}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Date Recorded</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(advancement.createdAt), "PPP")}
            </p>
          </div>
        </div>

        {advancement.note && (
          <div className="space-y-1 py-2">
            <p className="text-sm font-medium">Notes</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {advancement.note}
            </p>
          </div>
        )}

        {advancement.faceVideoUrl && (
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                {/* This is a placeholder. In a real app, you'd use a video player component */}
                <div className="text-center">
                  <VideoIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Face video available
                  </p>
                  <a
                    href={advancement.faceVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline mt-2 inline-block">
                    Open video in new tab
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
