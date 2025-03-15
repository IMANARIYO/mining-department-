// components/tunnel/tabs/TunnelDimensionsTab.tsx
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CustomSelect from "@/components/CustomSelect";
import { SelectOption } from "@/resources/types";

interface TunnelDimensionsTabProps {
  selectedCrossCut: string;
  setSelectedCrossCut: (value: string) => void;
  selectedSupport: string;
  setSelectedSupport: (value: string) => void;
}

const TunnelDimensionsTab: React.FC<TunnelDimensionsTabProps> = ({
  selectedCrossCut,
  setSelectedCrossCut,
  selectedSupport,
  setSelectedSupport
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Tunnel Dimensions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="Main Axis length" />
            <Input placeholder="Grade (%)" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Design Profile type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="type1">Type 1</SelectItem>
                <SelectItem value="type2">Type 2</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Height dimensions" />
            <Input placeholder="Width dimensions" />
            <Input placeholder="Cross-section Area(m2)" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Tunnel Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tunnel Type Input */}
          <Input
            className="w-full"
            placeholder="crosscut, Drift (ID), Raise (ID), Winze (ID), Heading (ID), Siding (ID), Stope (ID)"
          />

          {/* Grid Layout for Inputs & Selects */}
          <div className="grid grid-cols-3 gap-4">
            {/* Crosscut Select */}
            <CustomSelect
              options={[
                { value: "id1", label: "ID 1" },
                { value: "id2", label: "ID 2" }
              ]}
              placeholder="CrossCut (ID)"
              onChange={setSelectedCrossCut}
            />

            {/* Other Inputs */}
            <Input placeholder="Distance from main entry (m)" />
            <Input placeholder="Length dimensions (m)" />
            <Input placeholder="Deviation angle (degrees)" />
            <Input placeholder="Width dimensions (m)" />
            <Input placeholder="Height dimensions (m)" />

            {/* Supported Select */}
            <CustomSelect
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ]}
              placeholder="Supported"
              onChange={setSelectedSupport}
            />

            {/* Other Inputs */}
            <Input placeholder="Grade (%)" />
            <Textarea placeholder="Note" />
          </div>

          {/* Save Button */}
          <Button variant="outline" className="ml-auto">
            Save
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default TunnelDimensionsTab;
