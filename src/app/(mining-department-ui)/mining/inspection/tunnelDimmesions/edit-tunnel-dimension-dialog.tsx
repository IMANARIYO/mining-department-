"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateTunnelDimension } from "@/services/tunnelDimensionService";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import type { TunnelDimension } from "./tunnel-dimension-columns";
import CustomSelect from "@/components/CustomSelect";

interface EditTunnelDimensionDialogProps {
  dimension: TunnelDimension;
  onSuccess: () => void;
}

export function EditTunnelDimensionDialog({
  dimension,
  onSuccess
}: EditTunnelDimensionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    mainAxisLength: dimension.mainAxisLength,
    gradePercentage: dimension.gradePercentage,
    designProfileType: dimension.designProfileType,
    heightDimensions: dimension.heightDimensions,
    widthDimensions: dimension.widthDimensions,
    crossSectionArea: dimension.crossSectionArea
  });

  // Options for design profile types
  const profileOptions = [
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDesignProfileChange = (value: string) => {
    setFormData((prev) => ({ ...prev, designProfileType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const payload = {
        mainAxisLength: Number.parseFloat(formData.mainAxisLength.toString()),
        gradePercentage: Number.parseFloat(formData.gradePercentage.toString()),
        designProfileType: formData.designProfileType,
        heightDimensions: Number.parseFloat(
          formData.heightDimensions.toString()
        ),
        widthDimensions: Number.parseFloat(formData.widthDimensions.toString()),
        crossSectionArea: Number.parseFloat(
          formData.crossSectionArea.toString()
        )
      };

      await updateTunnelDimension(dimension.id, payload);
      toast.success("Tunnel dimension updated successfully");
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Error updating tunnel dimension:", error);
      toast.error("Failed to update tunnel dimension");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center w-full">
          <Pencil className="mr-2 h-4 w-4" />
          Edit dimension
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Tunnel Dimension</DialogTitle>
            <DialogDescription>
              Update the tunnel dimension details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mainAxisLength">Main Axis Length</Label>
                <Input
                  id="mainAxisLength"
                  name="mainAxisLength"
                  type="number"
                  value={formData.mainAxisLength}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="gradePercentage">Grade (%)</Label>
                <Input
                  id="gradePercentage"
                  name="gradePercentage"
                  type="number"
                  value={formData.gradePercentage}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="designProfileType">Design Profile Type</Label>
              <CustomSelect
                options={profileOptions}
                placeholder="Select Design Profile Type"
                onChange={handleDesignProfileChange}
                value={formData.designProfileType}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="heightDimensions">Height Dimensions</Label>
                <Input
                  id="heightDimensions"
                  name="heightDimensions"
                  type="number"
                  value={formData.heightDimensions}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="widthDimensions">Width Dimensions</Label>
                <Input
                  id="widthDimensions"
                  name="widthDimensions"
                  type="number"
                  value={formData.widthDimensions}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="crossSectionArea">Cross-Section Area (m²)</Label>
              <Input
                id="crossSectionArea"
                name="crossSectionArea"
                type="number"
                value={formData.crossSectionArea}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
