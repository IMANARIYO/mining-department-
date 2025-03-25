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
import { Input } from "@/components/ui/input";

import { updateProductionReport } from "@/services/productionReportService";
import { toast } from "sonner";
import { ProductionReport } from "./productionReportColumns";

interface EditProductionReportDialogProps {
  report: ProductionReport;
  onSuccess: () => void;
}

export const EditProductionReportDialog: React.FC<
  EditProductionReportDialogProps
> = ({ report, onSuccess }) => {
  const [formData, setFormData] = React.useState<
    Omit<ProductionReport, "id" | "createdAt" | "updatedAt">
  >({
    tunnelId: report.tunnelId,
    dailyPlan: report.dailyPlan,
    bookedMeter: report.bookedMeter,
    actualMeter: report.actualMeter,
    variance: report.variance,
    materialExcavated: report.materialExcavated,
    wasteExcavated: report.wasteExcavated
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tunnelId" ? value : parseFloat(value) || 0
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await updateProductionReport(report.id, formData);
      toast.success("Production report updated successfully");
      onSuccess(); // Refresh data
    } catch (error: any) {
      console.error("Error updating production report:", error);
      toast.error(error.message || "Failed to update production report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Edit Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Production Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block">Tunnel ID</label>
            <Input
              type="text"
              name="tunnelId"
              value={formData.tunnelId}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label className="block">Daily Plan (m)</label>
            <Input
              type="number"
              name="dailyPlan"
              value={formData.dailyPlan}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block">Booked Meter (m)</label>
            <Input
              type="number"
              name="bookedMeter"
              value={formData.bookedMeter}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block">Actual Meter (m)</label>
            <Input
              type="number"
              name="actualMeter"
              value={formData.actualMeter}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block">Variance (m)</label>
            <Input
              type="number"
              name="variance"
              value={formData.variance}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block">Material Excavated (Tons)</label>
            <Input
              type="number"
              name="materialExcavated"
              value={formData.materialExcavated}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block">Waste Excavated (Tons)</label>
            <Input
              type="number"
              name="wasteExcavated"
              value={formData.wasteExcavated}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </DialogContent>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          variant="default">
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
