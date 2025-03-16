import React, { useState } from "react";
import { createTunnelAdvancement } from "@/services/tunnelAdvancementService"; // Import the service for TunnelAdvancement
import ReusableForm from "@/components/ReusableForm";
import { Toaster, toast } from "sonner"; // Using toasts for error/success feedback

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
    // advancementDate: "",
    distanceAdvanced: "",
    methodUsed: "",
    notes: ""
  });
  console.log("am receaiving the ", tunnelId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation
  const validateForm = () => {
    if (!formData.tunnelId) {
      ("Select tunnel, please.");
      return "Select tunnel, please.";
    }
    const requiredFields = [
      //   { name: "advancementDate", message: "Advancement Date is required" },
      { name: "distanceAdvanced", message: "Advancement Distance is required" },
      { name: "methodUsed", message: "Method Used is required" },
      { name: "notes", message: "Notes are required" }
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
      lengthAdvanced: parseFloat(formData.distanceAdvanced as string),
      processType: formData.methodUsed as string,
      gradePercentage: 0, // Assuming a default value, replace with actual value if available
      note: formData.notes as string
      //   advancementDate: formData.advancementDate
    };

    try {
      setIsSubmitting(true);
      await createTunnelAdvancement(finalData); // Call the service to create the advancement
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
    type: "number" | "text" | "select" | "textarea" | "date";
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
