"use client";

import React, { useState } from "react";
import { createIncidentReport } from "@/services/incidentReportService"; // Import the service for Incident Report
import { Toaster, toast } from "sonner"; // Using toasts for error/success feedback
import ReusableForm from "@/components/ReusableForm";
import { Button } from "@/components/ui/button"; // Import button

interface IncidentReportFormProps {
  tunnelId: string;
  userId: string; // Needed for comment submission
  onSubmitSuccess: () => void;
}

const IncidentReportForm: React.FC<IncidentReportFormProps> = ({
  tunnelId,
  userId,
  onSubmitSuccess
}) => {
  const [formData, setFormData] = useState<
    Record<string, string | number | Date | undefined>
  >({
    tunnelId,
    incidentType: "",
    peopleInvolved: "",
    rootCauseAnalysis: "",
    measuresTaken: ""
  });

  const [showCommentField, setShowCommentField] = useState(false); // State to toggle comment field
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
  const handleSubmit = async () => {
    if (!validateForm()) return { status: "error" };

    const finalData: any = {
      tunnelId: formData.tunnelId as string,
      incidentType: formData.incidentType as string,
      peopleInvolved: formData.peopleInvolved as string,
      rootCauseAnalysis: formData.rootCauseAnalysis as string,
      measuresTaken: formData.measuresTaken as string
    };

    // Include comment if it was added
    if (
      showCommentField &&
      formData.comment &&
      typeof formData.comment === "string" && formData.comment.trim() !== ""
    ) {
      finalData.comment = formData.comment;
      finalData.userId = userId;
    }

    try {
      setIsSubmitting(true);
      await createIncidentReport(finalData);
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

  const incidentReportFields = [
    { name: "incidentType", type: "text" as "text" },
    { name: "peopleInvolved", type: "text" as "text" },
    { name: "rootCauseAnalysis", type: "textarea" as "textarea" },
    { name: "measuresTaken", type: "textarea" as "textarea" }
  ];

  // Conditionally add the comment field if the button is clicked
  if (showCommentField) {
    incidentReportFields.push({ name: " additional comment", type: "textarea" });
  }

  return (
    <div>
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

      {/* Button to toggle the comment field */}
      {!showCommentField && (
        <Button
          onClick={() => setShowCommentField(true)}
          className="mt-4 w-full">
          Add Comment
        </Button>
      )}
    </div>
  );
};

export default IncidentReportForm;
