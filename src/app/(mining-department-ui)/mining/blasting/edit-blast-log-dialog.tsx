"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateBlastLog } from "@/services/blastService";
import type { BlastLog } from "./blast-log-columns";

const formSchema = z.object({
  blastLocation: z.string().min(1, "Blast location is required"),
  blastId: z.string().min(1, "Blast ID is required"),
  dateTime: z.date(),
  rockType: z.string().min(1, "Rock type is required"),
  groundStability: z.string().min(1, "Ground stability is required"),
  waterPresence: z.string().min(1, "Water presence is required"),
  groundTemperature: z.coerce.number().min(-50).max(100),
  numberOfHoles: z.coerce.number().min(1, "At least one hole is required"),
  holeDepth: z.coerce.number().min(0.1, "Hole depth must be greater than 0"),
  holeDiameter: z.coerce
    .number()
    .min(1, "Hole diameter must be greater than 0"),
  holeCondition: z.string().min(1, "Hole condition is required"),
  ventilationPlan: z.boolean().default(false),
  areaEvacuated: z.boolean().default(false),
  personnelAccounted: z.boolean().default(false),
  equipmentRemoved: z.boolean().default(false),
  teamLeadSignature: z.string().optional(),
  teamMembers: z.array(z.string())
});

interface EditBlastLogDialogProps {
  blastLog: BlastLog;
  onSuccess?: () => void;
}

export function EditBlastLogDialog({
  blastLog,
  onSuccess
}: EditBlastLogDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blastLocation: blastLog.blastLocation,
      blastId: blastLog.blastId,
      dateTime: new Date(blastLog.dateTime),
      rockType: blastLog.rockType,
      groundStability: blastLog.groundStability,
      waterPresence: blastLog.waterPresence,
      groundTemperature: blastLog.groundTemperature,
      numberOfHoles: blastLog.numberOfHoles,
      holeDepth: blastLog.holeDepth,
      holeDiameter: blastLog.holeDiameter,
      holeCondition: blastLog.holeCondition,
      ventilationPlan: blastLog.ventilationPlan,
      areaEvacuated: blastLog.areaEvacuated,
      personnelAccounted: blastLog.personnelAccounted,
      equipmentRemoved: blastLog.equipmentRemoved,
      teamLeadSignature: blastLog.teamLeadSignature || "",
      teamMembers: blastLog.teamMembers || []
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await updateBlastLog(blastLog.id, {
        ...values,
        tunnelId: blastLog.tunnelId, // Preserve the tunnel ID
        dateTime: values.dateTime.toISOString()
      });
      toast.success("Blast log updated successfully");
      setOpen(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating blast log:", error);
      toast.error("Failed to update blast log");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTeamMember = () => {
    const currentMembers = form.getValues("teamMembers");
    form.setValue("teamMembers", [...currentMembers, ""]);
  };

  const removeTeamMember = (index: number) => {
    const currentMembers = form.getValues("teamMembers");
    form.setValue(
      "teamMembers",
      currentMembers.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
          Edit blast log
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blast Log</DialogTitle>
          <DialogDescription>
            Update the details of this blast operation
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="blastId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blast ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date & Time</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}>
                                {field.value ? (
                                  format(field.value, "PPp")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="blastLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blast Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Ground Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ground Conditions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rockType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rock Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="groundStability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ground Stability</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Stable">Stable</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Unstable">Unstable</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="waterPresence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Water Presence</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select water presence" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Dry">Dry</SelectItem>
                            <SelectItem value="Damp">Damp</SelectItem>
                            <SelectItem value="Wet">Wet</SelectItem>
                            <SelectItem value="Flowing">Flowing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="groundTemperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ground Temperature (°C)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Blast Hole Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Blast Hole Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="numberOfHoles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Holes</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="holeDepth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hole Depth (m)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="holeDiameter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hole Diameter (mm)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="holeCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hole Condition</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Clean">Clean</SelectItem>
                            <SelectItem value="Blocked">Blocked</SelectItem>
                            <SelectItem value="Partially Blocked">
                              Partially Blocked
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Safety Checklist */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Safety Checklist</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="ventilationPlan"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Ventilation Plan Implemented</FormLabel>
                          <FormDescription>
                            Confirm that proper ventilation is in place
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="areaEvacuated"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Area Evacuated and Secured</FormLabel>
                          <FormDescription>
                            Confirm that all personnel are clear of the blast
                            zone
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personnelAccounted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Personnel Accounted For</FormLabel>
                          <FormDescription>
                            Confirm that all personnel are accounted for
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="equipmentRemoved"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Equipment Removed from Blast Area
                          </FormLabel>
                          <FormDescription>
                            Confirm that all equipment is clear of the blast
                            zone
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Team Information */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-semibold">Team Information</h3>
                <FormField
                  control={form.control}
                  name="teamLeadSignature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Lead Signature</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <FormLabel>Team Members</FormLabel>
                  {form.watch("teamMembers").map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={`Team Member ${index + 1}`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTeamMember(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={addTeamMember}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
