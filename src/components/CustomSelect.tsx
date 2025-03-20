import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface CustomSelectProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string | null; // Accept selected value
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  value
}) => {
  // Local state to handle the auto-selection
  const [selectedValue, setSelectedValue] = useState<string | null>(
    value || null
  );

  useEffect(() => {
         
    if (options.length > 0 && !selectedValue) {
      // Set the first option as selected if no value is set
      setSelectedValue(options[0].value);
       onChange(options[0].value);
   
  
    }
  }, [options, selectedValue, onChange]);

  return (
    <Select
      onValueChange={(value) => {
        onChange(value);
        setSelectedValue(value); // Update local state when user selects an option
      }}
      value={selectedValue || ""} // Use local state as value
      disabled={options.length === 0}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={options.length > 0 ? placeholder : "No data available"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.length >= 0 ? (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value="no-data">
              No data available
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
