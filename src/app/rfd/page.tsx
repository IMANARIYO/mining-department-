"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";

export default function RFDPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [incidentType, setIncidentType] = useState<string>("");

  return (
    <div className="flex flex-col p-6 gap-6 max-w-5xl mx-auto">
      {/* Production Targets Adjustments Section */}
      <Card className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-[#5c4731]">
          Production Targets Adjustments
        </h2>

        <div className="space-y-4">
          {/* Daily Target */}
          <div>
            <label className="block text-sm font-medium text-[#5c4731] mb-1">
              Daily target (Tons)
            </label>
            <Input
              placeholder="Enter daily target"
              className="border-gray-300"
            />
          </div>

          {/* Equipment Efficiency */}
          <div>
            <label className="block text-sm font-medium text-[#5c4731] mb-1">
              Equipments Efficiency (%)
            </label>
            <Input
              placeholder="Enter efficiency target"
              className="border-gray-300"
            />
          </div>

          {/* Date Selector */}
          <div>
            <label className="block text-sm font-medium text-[#5c4731] mb-1">
              Set Date
            </label>
            <div className="flex">
              <p className="py-2 text-sm text-gray-500">
                {format(date, "EEEE dd MMMM yyyy")}
              </p>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto border-gray-300 text-gray-700"
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {format(date, "dd, MMMM yyyy")}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Update Button */}
          <Button className="w-full bg-[#a17d55] hover:bg-[#8b6d47] text-white">
            Update Targets
          </Button>
        </div>
      </Card>

      {/* Quick Incident Report Section */}
      <Card className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-[#5c4731]">
          Quick Incident Report
        </h2>

        <div className="space-y-4">
          {/* Incident Type */}
          <div>
            <label className="block text-sm font-medium text-[#5c4731] mb-1">
              Incident Type
            </label>
            <Select onValueChange={setIncidentType}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equipment_failure">
                  Equipment Failure
                </SelectItem>
                <SelectItem value="safety_incident">Safety Incident</SelectItem>
                <SelectItem value="production_delay">
                  Production Delay
                </SelectItem>
                <SelectItem value="quality_issue">Quality Issue</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Incident Description */}
          <div>
            <label className="block text-sm font-medium text-[#5c4731] mb-1">
              Description
            </label>
            <Textarea
              placeholder="Brief description about the incident"
              className="border-gray-300 min-h-32"
            />
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-[#1c1917] hover:bg-black text-white">
            Report Incident
          </Button>
        </div>
      </Card>
    </div>
  );
}
