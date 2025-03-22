"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { createBlastLog } from "@/services/blastService";
import { Toaster, toast } from "sonner";
interface BlastingFormProps {
  tunnelId: string;
  onSubmitSuccess: () => void;
}
const BlastingForm: React.FC<BlastingFormProps> = ({
  tunnelId,
  onSubmitSuccess
}) => {
  const [formData, setFormData] = useState({
    tunnelId: tunnelId,

    dateTime: new Date().toISOString(),
    blastLocation: "",
    blastId: "",
    rockType: "",
    groundStability: "",
    waterPresence: "",
    groundTemperature: 0,
    numberOfHoles: 0,
    holeDepth: 0,
    holeDiameter: 0,
    holeCondition: "",
    ventilationPlan: false,
    areaEvacuated: false,
    personnelAccounted: false,
    equipmentRemoved: false,
    teamLeadSignature: "",
    teamMembers: ["", ""] // Default 2 team members
  });
  // Validation function
  const validateForm = () => {
    if (!formData.tunnelId) {
      toast.error("Select tunnel, please.");
      return false;
    }
    const requiredFields = [
      // { name: "reportId", message: "Report ID is required" },
      { name: "blastLocation", message: "Blast Location is required" },
      { name: "rockType", message: "Rock Type is required" },
      { name: "groundStability", message: "Ground Stability is required" },
      { name: "waterPresence", message: "Water Presence is required" },
      { name: "holeCondition", message: "Hole Condition is required" },
      { name: "teamLeadSignature", message: "Team Lead Signature is required" }
    ];

    for (const field of requiredFields) {
      if (
        formData[field.name as keyof typeof formData] === "" ||
        formData[field.name as keyof typeof formData] == null
      ) {
        toast.error(field.message);
        return false;
      }
    }

    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleAddMember = () => {
    setFormData((prevData) => ({
      ...prevData,
      teamMembers: [...prevData.teamMembers, ""]
    }));
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = formData.teamMembers.filter(
      (_, idx) => idx !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      teamMembers: updatedMembers
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; // Ensure validation

    try {
      const formattedData = {
        ...formData,
        dateTime: new Date(formData.dateTime).toISOString(), // Ensure correct format
        numberOfHoles: parseInt(formData.numberOfHoles.toString(), 10) || 0, // Convert to integer
        holeDepth: parseInt(formData.holeDepth.toString(), 10) || 0,
        holeDiameter: parseInt(formData.holeDiameter.toString(), 10) || 0,
        groundTemperature:
          parseFloat(formData.groundTemperature.toString()) || 0,
        teamMembers: formData.teamMembers.filter(
          (member) => member.trim() !== ""
        ) // Remove empty members
      };

      await createBlastLog(formattedData);
      toast.success("Form submitted successfully!");
      onSubmitSuccess(); // Call parent success handler
    } catch (error) {
      toast.error("Error submitting form!");
      console.error("Submission Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Basic Information</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateTime">Date & Time</Label>
                  <Input
                    id="dateTime"
                    name="dateTime"
                    type="datetime-local"
                    value={formData.dateTime}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blastLocation">Blast Location</Label>
                  <Input
                    id="blastLocation"
                    name="blastLocation"
                    value={formData.blastLocation}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blastId">Blast ID</Label>
                  <Input
                    id="blastId"
                    name="blastId"
                    value={formData.blastId}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ground Conditions Assessment */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">
                Ground Conditions Assessment
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rockType">Rock Type</Label>
                  <Input
                    id="rockType"
                    name="rockType"
                    value={formData.rockType}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groundStability">Ground Stability</Label>
                  <Select
                    value={formData.groundStability}
                    onValueChange={(value) =>
                      handleSelectChange("groundStability", value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Stable">Stable</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Unstable">Unstable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waterPresence">Water Presence</Label>
                  <Select
                    value={formData.waterPresence}
                    onValueChange={(value) =>
                      handleSelectChange("waterPresence", value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water presence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dry">Dry</SelectItem>
                      <SelectItem value="Damp">Damp</SelectItem>
                      <SelectItem value="Wet">Wet</SelectItem>
                      <SelectItem value="Flowing">Flowing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groundTemperature">Ground Temperature</Label>
                  <Input
                    id="groundTemperature"
                    name="groundTemperature"
                    type="number"
                    // value={formData.groundTemperature}
                    // onChange={handleChange}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        groundTemperature: parseFloat(e.target.value) || 0
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Blast Hole Preparation */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Blast Hole Preparation</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numberOfHoles">Number of Holes</Label>
                  <Input
                    id="numberOfHoles"
                    name="numberOfHoles"
                    type="number"
                    value={formData.numberOfHoles}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="holeDiameter">Hole Diameter (mm)</Label>
                  <Input
                    id="holeDiameter"
                    name="holeDiameter"
                    type="number"
                    value={formData.holeDiameter}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="holeDepth">Hole Depth (m)</Label>
                  <Input
                    id="holeDepth"
                    name="holeDepth"
                    type="number"
                    value={formData.holeDepth}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hole Condition</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="holeCondition-clean"
                        checked={formData.holeCondition === "Clean"}
                        onCheckedChange={() =>
                          handleSelectChange("holeCondition", "Clean")
                        }
                      />
                      <Label htmlFor="holeCondition-clean">Clean</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="holeCondition-blocked"
                        checked={formData.holeCondition === "Blocked"}
                        onCheckedChange={() =>
                          handleSelectChange("holeCondition", "Blocked")
                        }
                      />
                      <Label htmlFor="holeCondition-blocked">Blocked</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="holeCondition-partial"
                        checked={formData.holeCondition === "Partially Blocked"}
                        onCheckedChange={() =>
                          handleSelectChange(
                            "holeCondition",
                            "Partially Blocked"
                          )
                        }
                      />
                      <Label htmlFor="holeCondition-partial">
                        Partially Blocked
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Checklist */}
          <Card className="">
            <CardHeader>
              <h2 className="text-lg font-semibold">Safety Checklist</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ventilationPlan"
                    checked={formData.ventilationPlan}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "ventilationPlan",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="ventilationPlan">
                    Ventilation Plan Implemented
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="areaEvacuated"
                    checked={formData.areaEvacuated}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("areaEvacuated", checked as boolean)
                    }
                  />
                  <Label htmlFor="areaEvacuated">
                    Area Evacuated and Secured
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="personnelAccounted"
                    checked={formData.personnelAccounted}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "personnelAccounted",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="personnelAccounted">
                    Personnel Accounted For
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="equipmentRemoved"
                    checked={formData.equipmentRemoved}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "equipmentRemoved",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="equipmentRemoved">
                    Equipment Removed from Blast Area
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Sign-off */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Team Sign-off</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamLeadSignature">Team Lead Signature</Label>
                <Input
                  id="teamLeadSignature"
                  name="teamLeadSignature"
                  value={formData.teamLeadSignature}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Team Members</Label>
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Input
                      value={member}
                      onChange={(e) => {
                        const newMembers = [...formData.teamMembers];
                        newMembers[index] = e.target.value;
                        setFormData((prevData) => ({
                          ...prevData,
                          teamMembers: newMembers
                        }));
                      }}
                    />
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => handleRemoveMember(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  className="mt-4"
                  onClick={handleAddMember}>
                  Add Team Member
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </form>
  );
};

export default BlastingForm;
