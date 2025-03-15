"use client";
import React from "react";
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
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
//  how to use it

// const TunnelManagementSystem = () => {
//   // State to store the selected option
//   const [selectedMineSite, setSelectedMineSite] = useState<string | null>(null);

//   // Options for the select dropdown
//   const mineSiteOptions = [
//     { value: "mine1", label: "Mine Site 1" },
//     { value: "mine2", label: "Mine Site 2" },
//     { value: "mine3", label: "Mine Site 3" }
//   ];

//   return (
//     <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Tunnel Management System</h1>

//       {/* CustomSelect for selecting a mine site */}
//       <CustomSelect
//         options={mineSiteOptions}
//         placeholder="Select Mine Site"
//         onChange={(value) => setSelectedMineSite(value)}
//       />

//       {/* Display the selected value */}
//       <p className="mt-4">Selected Mine Site: {selectedMineSite || "None"}</p>
//     </div>
//   );
// };

// export default TunnelManagementSystem;
