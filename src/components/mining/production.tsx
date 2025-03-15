"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, Printer } from "lucide-react";
import { format } from "date-fns";

export function ProductionReport() {
  const [date, setDate] = useState<Date>(new Date());

  const productionData = [
    {
      dailyPlan: "567 Meters",
      bookedMeter: "567 Meters",
      actualMeter: "1000 Meters",
      variance: "------",
      materialExcavated: "Pumps",
      wasteExcavated: "189 Kg",
    },
    {
      dailyPlan: "567 Meters",
      bookedMeter: "567 Meters",
      actualMeter: "1000 Meters",
      variance: "------",
      materialExcavated: "Pumps",
      wasteExcavated: "189 Kg",
    },
    {
      dailyPlan: "567 Meters",
      bookedMeter: "567 Meters",
      actualMeter: "1000 Meters",
      variance: "------",
      materialExcavated: "Pumps",
      wasteExcavated: "189 Kg",
    },
  ];

  return (
    <Card className="bg-white shadow-sm p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-medium text-[#5c4731]">
          Production Report
        </h2>

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

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 mb-4 text-sm font-medium text-gray-600">
        <div className="text-center">Daily Production Plan</div>
        <div className="text-center">Booked Meter</div>
        <div className="text-center">Actual Meter</div>
        <div className="text-center">Variance</div>
        <div className="text-center">Material Excavated</div>
        <div className="text-center">Waste Excavated</div>
      </div>

      {/* Table Data */}
      <div className="space-y-4">
        {productionData.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-4 py-4 border-b border-gray-100 last:border-0 text-sm"
          >
            <div className="text-center">{row.dailyPlan}</div>
            <div className="text-center">{row.bookedMeter}</div>
            <div className="text-center">{row.actualMeter}</div>
            <div className="text-center">{row.variance}</div>
            <div className="text-center">{row.materialExcavated}</div>
            <div className="text-center">{row.wasteExcavated}</div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-end mt-8 gap-4">
        <Button variant="outline" className="border-gray-300">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button className="bg-[#a17d55] hover:bg-[#8b6d47] text-white">
          Generate Tag
        </Button>
      </div>
    </Card>
  );
}
