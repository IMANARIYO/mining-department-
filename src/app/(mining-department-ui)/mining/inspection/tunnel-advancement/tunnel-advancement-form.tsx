"use client";

import type React from "react";
import { useState } from "react";
import { createTunnelAdvancement } from "@/services/tunnelAdvancementService";
import ReusableForm from "@/components/ReusableForm";
import { toast } from "sonner";

interface TunnelAdvancementFormProps {
  tunnelId: string;
  onSubmitSuccess: () => void;
}

const TunnelAdvancementForm: React.FC<TunnelAdvancementFormProps> = ({
  tunnelId,
  onSubmitSuccess
}) => {
  const [formData, setFormData] = useState<
    Record<string, string | number | Date | undefined>
  >({
    tunnelId,
    distanceAdvanced: "",
    methodUsed: "",
    gradePercentage: 0,
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation
  const validateForm = () => {
    if (!formData.tunnelId) {
      toast.error("Select tunnel, please.");
      return "Select tunnel, please.";
    }

    const requiredFields = [
      { name: "distanceAdvanced", message: "Advancement Distance is required" },
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
  const handleSubmit = async (data: Record<string, any>) => {
    if (!validateForm()) return { status: "error" };

    const finalData = {
      tunnelId: formData.tunnelId as string,
      lengthAdvanced: Number.parseFloat(formData.distanceAdvanced as string),
      processType: formData.methodUsed as string,
      gradePercentage: parseFloat(formData.gradePercentage as string) || 0,
      note: formData.notes as string,
      faceVideoUrl: (formData.faceVideoUrl as string) || undefined
    };

    try {
      setIsSubmitting(true);
      await createTunnelAdvancement(finalData);
      toast.success("Tunnel Advancement recorded successfully");
      onSubmitSuccess();
      return { status: "success" };
    } catch (error) {
      toast.error(
        "An error occurred while submitting the Tunnel Advancement form."
      );
      console.error(error);
      return { status: "error" };
    } finally {
      setIsSubmitting(false);
    }
  };

  const tunnelAdvancementFields: { 
    name: string; 
    type: "number" | "date" | "select" | "text" | "textarea"; 
    options?: { value: string; label: string }[] 
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
      title="Tunnel Advancement"
      fields={tunnelAdvancementFields}
      formData={formData}
      setFormData={setFormData}
      submitFunction={handleSubmit}
      onSubmitSuccess={onSubmitSuccess}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      validateForm={validateForm}
    />
  );
};

export default TunnelAdvancementForm;
