"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // UI Components
import { createTunnelDimension } from "@/services/tunnelDimensionService";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

interface TunnelDimensionFormProps {
  tunnelId: string; // Tunnel ID passed as prop
  onSubmitSuccess: () => void; // Callback when the form is successfully submitted
}

const TunnelDimensionForm: React.FC<TunnelDimensionFormProps> = ({
  tunnelId,
  onSubmitSuccess
}) => {
  const [mainAxisLength, setMainAxisLength] = useState<number | string>("");
  const [gradePercentage, setGradePercentage] = useState<number | string>("");
  const [designProfileType, setDesignProfileType] = useState<string>("");
  const [heightDimensions, setHeightDimensions] = useState<number | string>("");
  const [widthDimensions, setWidthDimensions] = useState<number | string>("");
  const [crossSectionArea, setCrossSectionArea] = useState<number | string>("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission

  // Options for design profile types
  const profileOptions = [
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" }
  ];

  // Handle form submission
  const handleSubmit = async () => {
    // Basic form validation
    if (
      !mainAxisLength ||
      !gradePercentage ||
      !designProfileType ||
      !heightDimensions ||
      !widthDimensions ||
      !crossSectionArea
    ) {
      toast.error("Please fill out all fields.");
      return; // Stop submission if any field is missing
    }

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true); // Disable further submissions until this one is finished

    const tunnelDimensionData = {
      tunnelId,
      mainAxisLength: parseFloat(mainAxisLength.toString()),
      gradePercentage: parseFloat(gradePercentage.toString()),
      designProfileType,
      heightDimensions: parseFloat(heightDimensions.toString()),
      widthDimensions: parseFloat(widthDimensions.toString()),
      crossSectionArea: parseFloat(crossSectionArea.toString())
    };

    try {
      // Call the createTunnelDimension API
      const response = await createTunnelDimension(tunnelDimensionData);
      if (response.status === "success") {
        // Show success toast message
        toast.success("Tunnel Dimension created successfully!");
          setMainAxisLength("");
          setGradePercentage("");
          setDesignProfileType("");
          setHeightDimensions("");
          setWidthDimensions("");
          setCrossSectionArea("");
        onSubmitSuccess(); // Callback to indicate success
      } else {
        // Show error toast message
        toast.error("Failed to create Tunnel Dimension.");
      }
    } catch (error) {
      console.error("Failed to create tunnel dimension", error);
      toast.error("An error occurred while creating the Tunnel Dimension.");
    } finally {
      setIsSubmitting(false); // Allow further submissions
    }
  };

  return (
    <>
      <Toaster /> {/* Add Toaster for toast notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Create Tunnel Dimension</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label>Main Axis Length</label>
              <Input
                type="number"
                placeholder="Main Axis Length"
                value={mainAxisLength}
                onChange={(e) => setMainAxisLength(e.target.value)}
              />
            </div>
            <div>
              <label>Grade (%)</label>
              <Input
                type="number"
                placeholder="Grade (%)"
                value={gradePercentage}
                onChange={(e) => setGradePercentage(e.target.value)}
              />
            </div>
            <div>
              <label>Design Profile Type</label>
              <CustomSelect
                options={profileOptions}
                placeholder="Select Design Profile Type"
                onChange={setDesignProfileType}
              />
            </div>
            <div>
              <label>Height Dimensions</label>
              <Input
                type="number"
                placeholder="Height Dimensions"
                value={heightDimensions}
                onChange={(e) => setHeightDimensions(e.target.value)}
              />
            </div>
            <div>
              <label>Width Dimensions</label>
              <Input
                type="number"
                placeholder="Width Dimensions"
                value={widthDimensions}
                onChange={(e) => setWidthDimensions(e.target.value)}
              />
            </div>
            <div>
              <label>Cross-Section Area (m²)</label>
              <Input
                type="number"
                placeholder="Cross-Section Area (m²)"
                value={crossSectionArea}
                onChange={(e) => setCrossSectionArea(e.target.value)}
              />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className="mt-4"
            disabled={isSubmitting} // Disable button if submitting
          >
            {isSubmitting ? "Submitting..." : "Create Tunnel Dimension"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default TunnelDimensionForm;
