// SiteFormSection.tsx
import { useState } from "react";
import { createSite } from "@/services/siteService";
import ReusableForm from "@/components/ReusableForm";
import { toast } from "sonner";

// Inline type definitions
interface SiteFormData {
  name: string;
  location: string;
  projectManager: string;
  startDate: string | Date | undefined;
  endDate: string | Date | undefined;
  [key: string]: string | number | Date | undefined;
}

interface FormField {
  name: string;
  type: "number" | "text" | "date" | "select" | "textarea";
}

interface SiteFormSectionProps {
  onSubmitSuccess: () => void;
}

const SiteFormSection = ({ onSubmitSuccess }: SiteFormSectionProps) => {
  const [siteData, setSiteData] = useState<
    Record<string, number | string | Date | undefined>
  >({
    name: "",
    location: "",
    projectManager: "",
    startDate: "",
    endDate: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation Function
  const validateForm = () => {
    const requiredFields = [
      { name: "name", message: "Site Name is required" },
      { name: "location", message: "Location is required" },
      { name: "projectManager", message: "Project Manager is required" },
      { name: "startDate", message: "Start Date is required" },
      { name: "endDate", message: "End Date is required" }
    ];

    for (const field of requiredFields) {
      if (!siteData[field.name as keyof SiteFormData]) {
        toast.error(field.message);
        return field.message;
      }
    }
    return true;
  };

  // Form Submission
  const handleSubmit = async (data: Record<string, any>) => {
    if (!validateForm()) {
      return Promise.reject(new Error("Validation failed"));
    }

    const formatDateForAPI = (date: Date | string | undefined) => {
      if (!date) return undefined;
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return dateObj.toISOString().split("T")[0]; // YYYY-MM-DD format
    };

    setIsSubmitting(true);

    const finalData = {
      name: data.name.trim(),
      location: data.location.trim(),
      projectManager: data.projectManager.trim(),
      startDate: formatDateForAPI(data.startDate) || "",
      endDate: data.endDate ? formatDateForAPI(data.endDate) : undefined
    };

    try {
      const response = await createSite(finalData);
      if (response.status === "success") {
        onSubmitSuccess();
        setSiteData({
          name: "",
          location: "",
          projectManager: "",
          startDate: "",
          endDate: new Date().toISOString().split("T")[0]
        });
      }
      return { status: "success" };
    } catch (error) {
      console.error("Error creating site:", error);
      return { status: "error" };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define the fields for `TunnelForm`
  const siteFormFields: FormField[] = [
    { name: "name", type: "text" },
    { name: "location", type: "text" },
    { name: "projectManager", type: "text" },
    { name: "startDate", type: "date" },
    { name: "endDate", type: "date" }
  ];

  return (
    <ReusableForm
      title="Site Information"
      fields={siteFormFields}
      formData={siteData}
      setFormData={setSiteData}
      submitFunction={handleSubmit}
      onSubmitSuccess={onSubmitSuccess}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      validateForm={validateForm}
    />
  );
};

export default SiteFormSection;
