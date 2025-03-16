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
  onDateChange,
  value
}: {
  onDateChange?: (date: Date | undefined) => void;
  value?: Date | string;
}) {
  // Default to today's date if value is not provided
  const defaultDate = new Date();
  defaultDate.setHours(12, 0, 0, 0); // Normalize time to avoid timezone issues
  // Initialize date state from provided value
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (!value) return defaultDate;
    if (typeof value === "string") return new Date(value);
    return value;
  });

  // Effect to sync props with internal state
  React.useEffect(() => {
    if (value) {
      const valueDate = typeof value === "string" ? new Date(value) : value;
      setDate(valueDate);
    }
  }, [value]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Create normalized date (noon to avoid timezone issues)
      const normalizedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        12,
        0,
        0 // Set time to 12:00:00 to avoid timezone crossover issues
      );

      setDate(normalizedDate);

      if (onDateChange) {
        onDateChange(normalizedDate);
      }
    } else {
      setDate(undefined);
      if (onDateChange) {
        onDateChange(undefined);
      }
    }
  };

  // Helper to format dates safely
  const formatDateSafe = (date: Date | undefined) => {
    if (!date) return "";
    try {
      return format(date, "PPP");
    } catch (e) {
      console.error("Invalid date format:", e);
      return "Invalid date";
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
          {date ? formatDateSafe(date) : <span>Pick a date</span>}
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
