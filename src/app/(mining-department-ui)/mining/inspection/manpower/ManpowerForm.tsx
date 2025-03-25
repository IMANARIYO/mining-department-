"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { createManpower } from "@/services/manapowerService";

// Zod schema for form validation
const manpowerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role is required"),
  location: z.string().min(2, "Location is required"),
  warning: z
    .object({
      status: z.boolean(),
      message: z.string().optional(),
    })
    .optional(),
  present: z.boolean().optional(),
});

interface ManpowerFormProps {
  tunnelId?: string;
  onSubmitSuccess?: () => void;
  initialData?: z.infer<typeof manpowerSchema>;
}

const ManpowerForm: React.FC<ManpowerFormProps> = ({
  tunnelId,
  onSubmitSuccess,
  initialData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof manpowerSchema>>({
    resolver: zodResolver(manpowerSchema),
    defaultValues: initialData || {
      name: "",
      role: "",
      location: "",
      warning: { status: false, message: "" },
      present: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof manpowerSchema>) => {
    setIsSubmitting(true);
    try {
      // Prepare submission data
      const submissionData = {
        ...data,
        tunnelId, // Include tunnelId if provided
      };

      // Call create service
      await createManpower(submissionData);

      toast.success("Manpower record created successfully");

      // Reset form
      form.reset();

      // Call success callback if provided
      onSubmitSuccess?.();
    } catch (error) {
      console.error("Failed to create manpower record:", error);
      toast.error("Failed to create manpower record");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Rod">Rod</SelectItem>
                    <SelectItem value="Foreman">Foreman</SelectItem>
                    <SelectItem value="SubContractor">SubContractor</SelectItem>
                    <SelectItem value="Engineer">Engineer</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter work location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Create Manpower Record"}
        </Button>
      </form>
    </Form>
  );
};

export default ManpowerForm;
