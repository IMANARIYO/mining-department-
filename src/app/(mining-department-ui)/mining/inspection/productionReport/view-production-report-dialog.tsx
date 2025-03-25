"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductionReport } from "./productionReportColumns";


interface ViewProductionReportDialogProps {
  report: ProductionReport;
}

export const ViewProductionReportDialog: React.FC<
  ViewProductionReportDialogProps
> = ({ report }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Production Report Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            <strong>Report ID:</strong> {report.id}
          </p>
          <p>
            <strong>Tunnel ID:</strong> {report.tunnelId}
          </p>
          <p>
            <strong>Daily Plan:</strong> {report.dailyPlan} m
          </p>
          <p>
            <strong>Booked Meter:</strong> {report.bookedMeter} m
          </p>
          <p>
            <strong>Actual Meter:</strong> {report.actualMeter} m
          </p>
          <p>
            <strong>Variance:</strong> {report.variance} m
          </p>
          <p>
            <strong>Material Excavated:</strong> {report.materialExcavated} Tons
          </p>
          <p>
            <strong>Waste Excavated:</strong> {report.wasteExcavated} Tons
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(report.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {report.updatedAt ? new Date(report.updatedAt).toLocaleString() : "N/A"}
          </p>
        </div>
      </DialogContent>
      <DialogFooter>
        <Button variant="outline" className="w-full">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
