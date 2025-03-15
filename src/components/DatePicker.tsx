
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

export function DatePicker({
  onDateChange
}: {
  onDateChange?: (date: Date | undefined) => void;
}) {
  const [date, setDate] = React.useState<Date>();

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// how to use the above  inthe  parent component 
const TunnelManagementSystem = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tunnel Management System</h1>

      {/* Using DatePicker and passing setSelectedDate function */}
      <DatePicker onDateChange={(date) => setSelectedDate(date)} />

      <p className="mt-4">
        Selected Date:{" "}
        {selectedDate ? format(selectedDate, "PPP") : "No date selected"}
      </p>
    </div>
  );
};
