"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { updateTunnelAdvancement } from "@/services/tunnelAdvancementService";
import { toast } from "sonner";
import type React from "react";
import ReusableForm from "@/components/ReusableForm";

type EditTunnelAdvancementDialogProps = {
  advancement: any;
  trigger?: React.ReactNode;
  onUpdateSuccess: () => void;
};

export function EditTunnelAdvancementDialog({
  advancement,
  trigger,
  onUpdateSuccess
}: EditTunnelAdvancementDialogProps) {
  const [open, setOpen] = useState(false);

  // Create a custom onSubmitSuccess handler that closes the dialog
  const handleFormSuccess = () => {
    setOpen(false);
    onUpdateSuccess();
  };

  // Create a custom TunnelAdvancementForm for editing
  const EditForm = () => {
    // Pre-populate the form data with the existing advancement values
    const [formData, setFormData] = useState<
      Record<string, string | number | Date | undefined>
    >({
      tunnelId: advancement.tunnelId,
      distanceAdvanced: advancement.lengthAdvanced.toString(),
      methodUsed: advancement.processType,
      gradePercentage: advancement.gradePercentage,
      faceVideoUrl: advancement.faceVideoUrl || "",
      notes: advancement.note || ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form validation
    const validateForm = () => {
      if (!formData.tunnelId) {
        toast.error("Select tunnel, please.");
        return "Select tunnel, please.";
      }

      const requiredFields = [
        {
          name: "distanceAdvanced",
          message: "Advancement Distance is required"
        },
        { name: "methodUsed", message: "Method Used is required" }
      ];

      for (const field of requiredFields) {
        if (formData[field.name] === "" || formData[field.name] == null) {
          toast.error(field.message);
          return field.message;
        }
      }

      return true as const;
    };

    // Handle form submission
    const handleSubmit = async () => {

      if (!validateForm()) return { status: "error" };

      const finalData = {
        tunnelId: formData.tunnelId as string,
        lengthAdvanced: Number.parseFloat(formData.distanceAdvanced as string),
        processType: formData.methodUsed as string,
        gradePercentage: (formData.gradePercentage as number) || 0,
        note: formData.notes as string,
        faceVideoUrl: (formData.faceVideoUrl as string) || undefined
      };

      try {
        setIsSubmitting(true);
        
        await updateTunnelAdvancement(advancement.id, finalData);
        toast.success("Tunnel advancement updated successfully");
        handleFormSuccess();
        return { status: "success" };
      } catch (error) {
        console.error("Failed to update tunnel advancement:", error);
        toast.error("Failed to update tunnel advancement");
        return { status: "error" };
      } finally {
        setIsSubmitting(false);
      }
    };

    const tunnelAdvancementFields: {
      name: string;
      type: "number" | "date" | "select" | "text" | "textarea";
      options?: { value: string; label: string }[];
    }[] = [
      { name: "advancementDate", type: "date" },
      { name: "distanceAdvanced", type: "number" },
      {
        name: "methodUsed",
        type: "select",
        options: [
          { value: "tbm", label: "Tunnel Boring Machine (TBM)" },
          { value: "drill-blast", label: "Drill and Blast" },
          { value: "natm", label: "New Austrian Tunneling Method" },
          { value: "cut-cover", label: "Cut and Cover" }
        ]
      },
      { name: "gradePercentage", type: "number" },
      { name: "faceVideoUrl", type: "text" },
      { name: "notes", type: "textarea" }
    ];

    return (
      <ReusableForm
        title="Edit Tunnel Advancement"
        fields={tunnelAdvancementFields}
        formData={formData}
        setFormData={setFormData}
        submitFunction={handleSubmit}
        onSubmitSuccess={handleFormSuccess}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        validateForm={validateForm}
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Edit2 className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      )}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Tunnel Advancement</DialogTitle>
          <DialogDescription>
            Update the tunnel advancement details.
          </DialogDescription>
        </DialogHeader>

        {open && <EditForm />}
      </DialogContent>
    </Dialog>
  );
}
