"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/CustomSelect";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/DatePicker";
interface TunnelFormProps {
  title: string;
  fields: {
    name: string;
    type: "number" | "text" | "select" | "textarea" | "date";
    options?: { value: string; label: string }[];
  }[];
  formData: Record<string, string | number | Date | undefined>;
  setFormData: (
    data: Record<string, string | number | Date | undefined>
  ) => void;
  submitFunction: (data: Record<string, any>) => Promise<{ status: string }>;
  onSubmitSuccess: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  validateForm: () => true | string;
}

const TunnelForm: React.FC<TunnelFormProps> = ({
  title,
  fields,
  formData,
  setFormData,
  submitFunction,
  onSubmitSuccess,
  isSubmitting,
  setIsSubmitting,
  validateForm
}) => {
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    if (isSubmitting) return; // Prevent multiple submissions
    // Call validateForm function passed from the parent
    const validationResult = validateForm();
    if (validationResult !== true) {
      toast.error(validationResult as string); // Show error message if validation fails
      return; // Prevent form submission
    }
    setIsSubmitting(true);
    try {
      const response = await submitFunction(formData);
      if (response.status === "success") {
        toast.success(`${title} created successfully!`);
        onSubmitSuccess();
      } else {
        toast.error(`Failed to create ${title}`);
      }
    } catch (error) {
      toast.error(
        `An error occurred while submitting the form: ${
          (error as Error).message
        }`
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {fields.map((field) => (
              // <div key={field.name}>
              //   <label>{field.name.replace(/([A-Z])/g, " $1")}</label>
              //   {field.type === "select" ? (
              //     <CustomSelect
              //       options={field.options || []}
              //       placeholder={`Select ${field.name}`}
              //       onChange={(value) =>
              //         setFormData({ ...formData, [field.name]: value })
              //       }
              //     />
              //   ) : (
              //     <Input
              //       type={field.type}
              //       placeholder={field.name.replace(/([A-Z])/g, " $1")}
              //       value={formData[field.name]}
              //       onChange={(e) =>
              //         setFormData({ ...formData, [field.name]: e.target.value })
              //       }
              //     />
              //   )}
              // </div>

              <div key={field.name}>
                <label>{field.name.replace(/([A-Z])/g, " $1")}</label>
                {field.type === "select" ? (
                  <CustomSelect
                    options={field.options || []}
                    placeholder={`Select ${field.name}`}
                    onChange={(value) =>
                      setFormData({ ...formData, [field.name]: value })
                    }
                  />
                ) : field.type === "textarea" ? (
                  <Textarea
                    placeholder={field.name.replace(/([A-Z])/g, " $1")}
                    value={formData[field.name] as string}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                  />
                ) : field.type === "date" ? (
                  <DatePicker
                    onDateChange={(date) => {
                      setFormData({ ...formData, [field.name]: date });
                    }}
                  />
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.name.replace(/([A-Z])/g, " $1")}
                    value={formData[field.name] as string | number}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            className="mt-4"
            disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : `Create ${title}`}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default TunnelForm;
