"use client";

import React, { useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, Edit, ImagePlus, Send, Printer } from "lucide-react";
import { format } from "date-fns";

export function IncidenceReport() {
  const [date, setDate] = useState<Date>(new Date());
  const [incidentType, setIncidentType] = useState("");
  const [tunnel, setTunnel] = useState("");

  return (
    <Card className="bg-white shadow-sm p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-medium text-[#5c4731]">Incident Report</h2>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 px-3 py-2 h-auto"
              >
                <span className="mr-2">{format(date, "dd MMMM yyyy")}</span>
                <ChevronDown className="h-4 w-4" />
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

      <div className="space-y-6">
        {/* Incident Details Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div>
            <div className="mb-2">Incident Type</div>
            <Select onValueChange={setIncidentType}>
              <SelectTrigger className="border-gray-300 w-full">
                <SelectValue placeholder="Choose Type" />
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

          <div>
            <div className="mb-2">Tunnel Id</div>
            <Select onValueChange={setTunnel}>
              <SelectTrigger className="border-gray-300 w-full">
                <SelectValue placeholder="Choose Tunnel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tunnel_1">Tunnel 1</SelectItem>
                <SelectItem value="tunnel_2">Tunnel 2</SelectItem>
                <SelectItem value="tunnel_3">Tunnel 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mb-2">SOS People</div>
            <Input placeholder="Enter SOS Number" className="border-gray-300" />
          </div>

          <div>
            <div className="mb-2">People Involved</div>
            <Input placeholder="People Involved" className="border-gray-300" />
          </div>

          <div>
            <div className="mb-2">Root cause analysis</div>
            <Input
              placeholder="What caused incident?"
              className="border-gray-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2">Measure taken</div>
            <Input placeholder="First Aid" className="border-gray-300" />
          </div>
        </div>

        {/* Additional Comments */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium text-[#5c4731]">
              Additional Comments
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-gray-300 flex items-center gap-1 px-3 py-1 h-auto text-sm"
              >
                <Edit className="h-4 w-4" />
                Edit Comment
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 flex items-center gap-1 px-3 py-1 h-auto text-sm"
              >
                <ImagePlus className="h-4 w-4" />
                Add Photo
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Description"
            className="border-gray-300 min-h-32"
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" className="border-gray-300">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button className="bg-[#a17d55] hover:bg-[#8b6d47] text-white">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
}
