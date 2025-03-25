"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Edit2 } from "lucide-react";
import { updateIncidentReport } from "@/services/incidentReportService";
import { toast } from "sonner";
import ReusableForm from "@/components/ReusableForm";

type EditIncidentReportDialogProps = {
  report: any;
  onUpdateSuccess: () => void;
};

export function EditIncidentReportDialog({
  report,
  onUpdateSuccess
}: EditIncidentReportDialogProps) {
  const [open, setOpen] = useState(false);

  // Create a custom onSubmitSuccess handler that closes the dialog
  const handleFormSuccess = () => {
    setOpen(false);
    onUpdateSuccess();
  };

  // Create a custom IncidentReportForm for editing
  const EditForm = () => {
    // Pre-populate the form data with the existing report values
    const [formData, setFormData] = useState<
      Record<string, string | number | Date | undefined>
    >({
      tunnelId: report.tunnelId,
      incidentType: report.incidentType,
      peopleInvolved: report.peopleInvolved,
      rootCauseAnalysis: report.rootCauseAnalysis,
      measuresTaken: report.measuresTaken
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form validation
    const validateForm = () => {
      if (!formData.tunnelId) {
        toast.error("Select tunnel, please.");
        return "Select tunnel, please.";
      }

      const requiredFields = [
        { name: "incidentType", message: "Incident Type is required" },
        { name: "peopleInvolved", message: "People Involved is required" }
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
        incidentType: formData.incidentType as string,
        peopleInvolved: formData.peopleInvolved as string,
        rootCauseAnalysis: formData.rootCauseAnalysis as string,
        measuresTaken: formData.measuresTaken as string
      };

      try {
        setIsSubmitting(true);
        await updateIncidentReport(report.id, finalData);
        toast.success("Incident report updated successfully");
        handleFormSuccess();
        return { status: "success" };
      } catch (error) {
        console.error("Failed to update incident report:", error);
        toast.error("Failed to update incident report");
        return { status: "error" };
      } finally {
        setIsSubmitting(false);
      }
    };

    const incidentReportFields: {
      name: string;
      type: "select" | "text" | "textarea";
      options?: { value: string; label: string }[];
    }[] = [
      {
        name: "incidentType",
        type: "select",
        options: [
          { value: "injury", label: "Personnel Injury" },
          { value: "equipment", label: "Equipment Damage" },
          { value: "structural", label: "Structural Issue" },
          { value: "environmental", label: "Environmental Incident" },
          { value: "near-miss", label: "Near Miss" },
          { value: "other", label: "Other" }
        ]
      },
      { name: "peopleInvolved", type: "text" },
      { name: "rootCauseAnalysis", type: "textarea" },
      { name: "measuresTaken", type: "textarea" }
    ];

    return (
      <ReusableForm
        title="Edit Incident Report"
        fields={incidentReportFields}
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
      <div onClick={() => setOpen(true)}>
        <Edit2 className="mr-2 h-4 w-4" />
        Edit
      </div>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Incident Report</DialogTitle>
          <DialogDescription>
            Update the incident report details.
          </DialogDescription>
        </DialogHeader>

        {open && <EditForm />}
      </DialogContent>
    </Dialog>
  );
}
