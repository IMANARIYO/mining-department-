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
import { updateTunnelComponent } from "@/services/tunnelComponentService";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import CustomSelect from "@/components/CustomSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { TunnelComponent } from "./tunnel-components-columns";

interface EditTunnelComponentDialogProps {
  tunnelComponent: TunnelComponent;
  onSuccess: () => void;
}

export function EditTunnelComponentDialog({
  tunnelComponent,
  onSuccess
}: EditTunnelComponentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    componentType: tunnelComponent.componentType,
    distanceFromEntry: tunnelComponent.distanceFromEntry,
    length: tunnelComponent.length,
    deviationAngle: tunnelComponent.deviationAngle,
    widthDimensions: tunnelComponent.widthDimensions,
    heightDimensions: tunnelComponent.heightDimensions,
    supported: tunnelComponent.supported,
    gradePercentage: tunnelComponent.gradePercentage,
    note: tunnelComponent.note || ""
  });

  // Options for component types
  const componentTypeOptions = [
    { value: "straightSection", label: "Straight Section" },
    { value: "curve", label: "Curve" },
    { value: "junction", label: "Junction" },
    { value: "accessPoint", label: "Access Point" },
    { value: "ventilationShaft", label: "Ventilation Shaft" }
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleComponentTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, componentType: value }));
  };

  const handleSupportedChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, supported: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const payload = {
        componentType: formData.componentType,
        distanceFromEntry: formData.distanceFromEntry,
        length: formData.length,
        deviationAngle: formData.deviationAngle,
        widthDimensions: formData.widthDimensions,
        heightDimensions: formData.heightDimensions,
        supported: formData.supported,
        gradePercentage: formData.gradePercentage,
        note: formData.note || null
      };

      await updateTunnelComponent(tunnelComponent.id, payload);
      toast.success("Tunnel component updated successfully");
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Error updating tunnel component:", error);
      toast.error("Failed to update tunnel component");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center w-full">
          <Pencil className="mr-2 h-4 w-4" />
          Edit component
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Tunnel Component</DialogTitle>
            <DialogDescription>
              Update the tunnel component details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="componentType">Component Type</Label>
              <CustomSelect
                options={componentTypeOptions}
                placeholder="Select Component Type"
                onChange={handleComponentTypeChange}
                value={formData.componentType}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="distanceFromEntry">Distance From Entry</Label>
                <Input
                  id="distanceFromEntry"
                  name="distanceFromEntry"
                  value={formData.distanceFromEntry}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="length">Length</Label>
                <Input
                  id="length"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deviationAngle">Deviation Angle</Label>
                <Input
                  id="deviationAngle"
                  name="deviationAngle"
                  value={formData.deviationAngle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="gradePercentage">Grade (%)</Label>
                <Input
                  id="gradePercentage"
                  name="gradePercentage"
                  value={formData.gradePercentage}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="widthDimensions">Width Dimensions</Label>
                <Input
                  id="widthDimensions"
                  name="widthDimensions"
                  value={formData.widthDimensions}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="heightDimensions">Height Dimensions</Label>
                <Input
                  id="heightDimensions"
                  name="heightDimensions"
                  value={formData.heightDimensions}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="supported"
                checked={formData.supported}
                onCheckedChange={handleSupportedChange}
              />
              <Label htmlFor="supported">Supported</Label>
            </div>
            <div>
              <Label htmlFor="note">Note (Optional)</Label>
              <Input
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
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
