"use client";

import { useState } from "react";
import { createProductionReport } from "@/services/productionReportService";
import ReusableForm from "@/components/ReusableForm";
import { toast } from "sonner";

interface ProductionReportData {
  date: string | Date | undefined;
  tunnelId: string;
  dailyPlan: number;
  bookedMeter: number;
  actualMeter: number;
  variance: number;
  materialExcavated: number;
  wasteExcavated: number;
  [key: string]: string | number | Date | undefined;
}

interface FormField {
  name: string;
  type: "number" | "text" | "date";
}

interface ProductionReportFormProps {
  tunnelId: string;
  onSubmitSuccess: () => void;
}

const ProductionReportForm = ({
  tunnelId,
  onSubmitSuccess
}: ProductionReportFormProps) => {
  const [reportData, setReportData] = useState<ProductionReportData>({
    date: "",
    tunnelId,
    dailyPlan: 0,
    bookedMeter: 0,
    actualMeter: 0,
    variance: 0,
    materialExcavated: 0,
    wasteExcavated: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation Function
  const validateForm = () => {
    const requiredFields = [
      { name: "date", message: "Report Date is required" },
      { name: "dailyPlan", message: "Daily Plan is required" },
      { name: "bookedMeter", message: "Booked Meter is required" },
      { name: "actualMeter", message: "Actual Meter is required" },
      { name: "materialExcavated", message: "Material Excavated is required" },
      { name: "wasteExcavated", message: "Waste Excavated is required" }
    ];

    for (const field of requiredFields) {
      if (!reportData[field.name as keyof ProductionReportData]) {
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
      tunnelId,
      date: formatDateForAPI(data.date) || "",
      dailyPlan: Number(data.dailyPlan),
      bookedMeter: Number(data.bookedMeter),
      actualMeter: Number(data.actualMeter),
      variance: Number(data.actualMeter) - Number(data.bookedMeter),
      materialExcavated: Number(data.materialExcavated),
      wasteExcavated: Number(data.wasteExcavated)
    };

    try {
      const response = await createProductionReport(finalData);
      if (response.status === "success") {
        onSubmitSuccess();
        setReportData({
          date: "",
          tunnelId,
          dailyPlan: 0,
          bookedMeter: 0,
          actualMeter: 0,
          variance: 0,
          materialExcavated: 0,
          wasteExcavated: 0
        });
      }
      return { status: "success" };
    } catch (error) {
      console.error("Error creating production report:", error);
      return { status: "error" };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define the fields for Production Report Form
  const productionReportFields: FormField[] = [
    { name: "date", type: "date" },
    { name: "dailyPlan", type: "number" },
    { name: "bookedMeter", type: "number" },
    { name: "actualMeter", type: "number" },
    { name: "materialExcavated", type: "number" },
    { name: "wasteExcavated", type: "number" }
  ];

  return (
    <ReusableForm
      title="Production Report"
      fields={productionReportFields}
      formData={reportData}
      setFormData={(data) => setReportData((prev) => ({ ...prev, ...data }))}
      submitFunction={handleSubmit}
      onSubmitSuccess={onSubmitSuccess}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      validateForm={validateForm}
    />
  );
};

export default ProductionReportForm;
