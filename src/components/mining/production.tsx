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
import { DataTable } from "../tablesUtils/data-table";

interface ProductionReportProps {
  columns: any[];
  data: any[];
}

export function ProductionReport({ columns, data }: ProductionReportProps) {
  const [date, setDate] = useState<Date>(new Date());


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
                className="border-gray-300 text-gray-700 px-3 py-2 h-auto">
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
      <DataTable columns={columns} data={data} />

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
