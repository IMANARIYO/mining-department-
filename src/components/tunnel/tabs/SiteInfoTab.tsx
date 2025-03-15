// components/tunnel/tabs/SiteInfoTab.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import CustomSelect from "@/components/CustomSelect";
import { DatePicker } from "@/components/DatePicker";
import { ManpowerTable, EquipmentTable } from "@/components/tunnel";
import { ManpowerItem, EquipmentItem, SelectOption } from "@/resources/types";
import { toggleItemPresence } from "@/resources/utils/helpers";


toggleItemPresence
interface SiteInfoTabProps {
  mineSites: SelectOption[];
  tunnels: SelectOption[];
  shifts: SelectOption[];
  manpowerData: ManpowerItem[];
  setManpowerData: React.Dispatch<React.SetStateAction<ManpowerItem[]>>;
  equipmentData: EquipmentItem[];
  setEquipmentData: React.Dispatch<React.SetStateAction<EquipmentItem[]>>;
  selectedMineSite: string | null;
  setSelectedMineSite: (value: string | null) => void;
  selectedTunnel: string | null;
  setSelectedTunnel: (value: string | null) => void;
  selectedShift: string | null;
  setSelectedShift: (value: string | null) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const SiteInfoTab: React.FC<SiteInfoTabProps> = ({
  mineSites,
  tunnels,
  shifts,
  manpowerData,
  setManpowerData,
  equipmentData,
  setEquipmentData,
  selectedMineSite,
  setSelectedMineSite,
  selectedTunnel,
  setSelectedTunnel,
  selectedShift,
  setSelectedShift,
  selectedDate,
  setSelectedDate
}) => {
  // Function to toggle presence for manpower
  const toggleManpowerPresence = (id: string) => {
    setManpowerData((prevData) => toggleItemPresence(prevData, id));
  };

  // Function to toggle presence for equipment
  const toggleEquipmentPresence = (id: string) => {
    setEquipmentData((prevData) => toggleItemPresence(prevData, id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Inspection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <CustomSelect
            options={mineSites}
            placeholder="Select Mine Site"
            onChange={(value) => setSelectedMineSite(value)}
          />
          <CustomSelect
            options={tunnels}
            placeholder="Select Tunnel ID"
            onChange={(value) => setSelectedTunnel(value)}
          />
          <CustomSelect
            options={shifts}
            placeholder="Select Shift"
            onChange={(value) => setSelectedShift(value)}
          />
          <div className="relative">
            <DatePicker onDateChange={(date) => setSelectedDate(date)} />
          </div>
        </div>

        <ManpowerTable
          data={manpowerData}
          onTogglePresence={toggleManpowerPresence}
        />

        <EquipmentTable
          data={equipmentData}
          onTogglePresence={toggleEquipmentPresence}
        />

        <Card>
          <CardHeader>
            <CardTitle>Blast Log Detail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Blast Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Quantity" />
              <Input placeholder="Failed blasts (QTY)" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Delay Pattern" />
              <Input placeholder="Blast Pattern" />
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SiteInfoTab;
