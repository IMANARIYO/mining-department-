import React, { useState } from "react";
import { createTunnelComponent } from "@/services/tunnelComponentService";
import ReusableForm from "@/components/ReusableForm";
import { Toaster, toast } from "sonner";

interface TunnelComponentFormProps {
  tunnelId: string;
  onSubmitSuccess: () => void;
}

const TunnelComponentForm: React.FC<TunnelComponentFormProps> = ({
  tunnelId,
  onSubmitSuccess
}) => {
  const [formData, setFormData] = useState<
    Record<string, string | number | Date | undefined>
  >({
    tunnelId,
    componentType: "",
    distanceFromEntry: "",
    length: "",
    deviationAngle: "",
    widthDimensions: "",
    heightDimensions: "",
    supported: "",
    gradePercentage: "",
    note: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateForm = () => {
    // List of required fields and their corresponding error messages
    const requiredFields = [
      { name: "componentType", message: "Component Type is required" },
      { name: "distanceFromEntry", message: "Distance from Entry is required" },
      { name: "length", message: "Length is required" },
      { name: "deviationAngle", message: "Deviation Angle is required" },
      { name: "widthDimensions", message: "Width Dimensions are required" },
      { name: "heightDimensions", message: "Height Dimensions are required" },
      { name: "supported", message: "Support is required" },
      { name: "gradePercentage", message: "Grade Percentage is required" },
      { name: "note", message: "Note is required" }
    ];

    // Loop through each required field and check if it's empty
    for (const field of requiredFields) {
      if (formData[field.name] === "" || formData[field.name] == null) {
        //   toast.error(field.message);
        return field.message;
      }
    }

    return true; // Return true if all fields are valid
  };

  const handleSubmit = async (data: Record<string, any>) => {
    if (!validateForm()) {
      return; // If validation fails, don't submit the form
    }
    // Data manipulation before submitting the form
    const finalData = {
      ...formData,
      supported:
        formData.supported === "true"
          ? true
          : formData.supported === "false"
          ? false
          : undefined,
      distanceFromEntry: formData.distanceFromEntry,
      length: formData.length,
      deviationAngle: formData.deviationAngle,
      widthDimensions: formData.widthDimensions,
      heightDimensions: formData.heightDimensions,
      gradePercentage: formData.gradePercentage
    };

    try {
      setIsSubmitting(true);
      return await createTunnelComponent(finalData);
    } catch (error) {
      toast.error(
        "An error occurred while submitting the  createTunnelComponent form."
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const tunnelComponentsFileds: {
    name: string;
    type: "number" | "text" | "select" | "textarea";
    options?: { value: string; label: string }[];
  }[] = [
    { name: "componentType", type: "text" },
    { name: "distanceFromEntry", type: "number" },
    { name: "length", type: "number" },
    { name: "deviationAngle", type: "number" },
    { name: "widthDimensions", type: "number" },
    { name: "heightDimensions", type: "number" },
    {
      name: "supported",
      type: "select",
      options: [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" }
      ]
    },
    { name: "gradePercentage", type: "number" },
    { name: "note", type: "textarea" }
  ];
  return (
    <ReusableForm
      title="Tunnel Component"
      fields={tunnelComponentsFileds}
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

export default TunnelComponentForm;
