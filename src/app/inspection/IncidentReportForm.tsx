"use client";

import React, { useState } from "react";
import { createIncidentReport } from "@/services/incidentReportService"; // Import the service for Incident Report

import { Toaster, toast } from "sonner"; // Using toasts for error/success feedback
import ReusableForm from "@/components/ReusableForm";

interface IncidentReportFormProps {
  tunnelId: string; // Assuming tunnelId is passed in as a prop
  onSubmitSuccess: () => void;
}

const IncidentReportForm: React.FC<IncidentReportFormProps> = ({
  tunnelId,
  onSubmitSuccess
}) => {
  const [formData, setFormData] = useState<
    Record<string, string | number | Date | undefined>
  >({
    tunnelId,
    incidentType: "",
    peopleInvolved: "",
    rootCauseAnalysis: "",
    measuresTaken: "",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      { name: "incidentType", message: "Incident Type is required" },
      { name: "peopleInvolved", message: "People Involved is required" },
      { name: "rootCauseAnalysis", message: "Root Cause Analysis is required" },
      { name: "measuresTaken", message: "Measures Taken is required" }
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
      incidentType: formData.incidentType as string,
      peopleInvolved: formData.peopleInvolved as string,
      rootCauseAnalysis: formData.rootCauseAnalysis as string,
      measuresTaken: formData.measuresTaken as string
    };

    try {
      setIsSubmitting(true);
      await createIncidentReport(finalData); // Call the service to create the incident report
      toast.success("Incident Report recorded successfully");
      onSubmitSuccess();
      return { status: "success" };
    } catch (error) {
      toast.error("An error occurred while submitting the Incident Report.");
      console.error(error);
      return { status: "error" };
    } finally {
      setIsSubmitting(false);
    }
  };

  const incidentReportFields: {
    name: string;
    type: "number" | "text" | "select" | "textarea" | "date";
    options?: { value: string; label: string }[];
  }[] = [
    { name: "incidentType", type: "text" },
    { name: "peopleInvolved", type: "text" },
    { name: "rootCauseAnalysis", type: "textarea" },
    { name: "measuresTaken", type: "textarea" }
  ];

  return (
    <ReusableForm
      title="Incident Report"
      fields={incidentReportFields}
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

export default IncidentReportForm;
