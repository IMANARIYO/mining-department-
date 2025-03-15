"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, CheckCircle } from "lucide-react"; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

import CustomSelect from "@/components/CustomSelect";
import { DatePicker } from "@/components/DatePicker";
import { Label } from "@/components/ui/label";
import SiteForm from "./AddSiteForm";
import TunnelDimensionForm from "./TunnelDimensionForm";
import TunnelComponentForm from "./TunnelComponentForm";
import TunnelAdvancementForm from "./TunnelAdvancementForm";

const TunnelManagementSystem = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [manpowerData, setManpowerData] = useState([
    {
      id: "1",
      warning: { status: true, message: "No safety helmet" },
      name: "Eric Rukundo",
      role: "Rod",
      location: "Tunnel 1 / Wing 1",
      present: false
    },
    {
      id: "2",
      warning: { status: true, message: "Expired ID" },
      name: "Nshuti Warning",
      role: "SubContractor",
      location: "Tunnel 1 / Wing 1",
      present: false
    },
    {
      id: "3",
      warning: { status: false, message: "" },
      name: "John Doe",
      role: "Foreman",
      location: "Tunnel 2 / Wing 2",
      present: false
    }
  ]);

  const [equipmentData, setEquipmentData] = useState([
    {
      id: "1",
      warning: { status: true, message: "Needs maintenance" },
      equipment: "Pumps",
      number: "2",
      location: "Tunnel 1",
      present: false
    },
    {
      id: "2",
      warning: { status: false, message: "" },
      equipment: "Bobcat",
      number: "1",
      location: "Site 1",
      present: false
    }
  ]);
  
  const [selectedMineSite, setSelectedMineSite] = useState<string | null>(null);
  const [selectedTunnel, setSelectedTunnel] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [selectedSupport, setSelectedSupport] = useState("");
  const [selectedCrossCut, setSelectedCrossCut] = useState("");
  const [selectedProcessType, setSelectedProcessType] = useState("");
  const [selectedBlastType, setSelectedBlastType] = useState("");
  const [incidentType, setIncidentType] = useState("");
   const [tunnelId, setTunnelId] = useState<string>(
     "4a48752a-b260-4c99-ab30-f56f0070e4ad"
   );
    const handleFormSubmitSuccess = () => {
      console.log("Tunnel dimension created successfully!");
      // You can refresh data or take any other action here
    };
  const [sosPeople, setSosPeople] = useState("");
  const [peopleInvolved, setPeopleInvolved] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [measuresTaken, setMeasuresTaken] = useState("");
  const [comments, setComments] = useState("");

  const mineSites = [
    { value: "site1", label: "Mine Site 1" },
    { value: "site2", label: "Mine Site 2" },
    { value: "site3", label: "Mine Site 3" }
  ];
  const blastLogColumns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    { field: "tunnel", headerName: "Tunnel", flex: 1 },
    { field: "location", headerName: "Location (m)", flex: 1 },
    { field: "pattern", headerName: "Pattern", flex: 1 },
    { field: "explosive", headerName: "Explosive", flex: 1 },
    { field: "result", headerName: "Result", flex: 1 }
  ];
  const tunnels = [
    { value: "tunnel1", label: "Tunnel 1" },
    { value: "tunnel2", label: "Tunnel 2" },
    { value: "tunnel3", label: "Tunnel 3" },
    { value: "tunnel4", label: "Tunnel 4" },
    { value: "tunnel5", label: "Tunnel 5" },
    { value: "tunnel6", label: "Tunnel 6" },
    { value: "tunnel7", label: "Tunnel 7" },
    { value: "tunnel8", label: "Tunnel 8" }
  ];
  const shifts = [
    { value: "day", label: "Day Shift" },
    { value: "night", label: "Night Shift" }
  ];
  const incidents = [
    { value: "fall", label: "Rock Fall" },
    { value: "fire", label: "Fire" }
  ];
  // Function to toggle presence
  const togglePresence = (id: string, type: "manpower" | "equipment") => {
    if (type === "manpower") {
      setManpowerData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, present: !item.present } : item
        )
      );
    } else {
      setEquipmentData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, present: !item.present } : item
        )
      );
    }
  };
const blastLogRows = [
  {
    id: 1,
    date: "2025-03-08",
    time: "14:30",
    tunnel: "Tunnel #1",
    location: 156.5,
    pattern: "Burn Cut",
    explosive: "45.2 kg ANFO",
    result: "Good",
  },
  {
    id: 2,
    date: "2025-03-07",
    time: "15:15",
    tunnel: "Tunnel #1",
    location: 152.0,
    pattern: "Burn Cut",
    explosive: "43.8 kg ANFO",
    result: "Excellent",
  },
  {
    id: 3,
    date: "2025-03-06",
    time: "14:45",
    tunnel: "Tunnel #1",
    location: 146.8,
    pattern: "Wedge Cut",
    explosive: "40.5 kg ANFO",
    result: "Satisfactory",
  },
];

  const manpowerColumns: GridColDef[] = [
    { field: "id", headerName: "ID", hideable: false, width: 20 },
    {
      field: "warning",
      headerName: "Warning",
      renderCell: (params) => (
        <div
          style={{
          
            color: params.value.status ? "black" : "inherit",
            padding: "5px",
            borderRadius: "4px"
          }}>
          {params.value.status ? `⚠ ${params.value.message}` : "✅ Safe"}
        </div>
      ),
      width: 200
    },
    { field: "name", headerName: "Name", type: "string", width: 200 },
    { field: "role", headerName: "Role", type: "string" },
    { field: "location", headerName: "Location", type: "string", width: 200 },
    {
      field: "present",
      headerName: "Present",
      renderCell: (params) => (
        <Checkbox
          checked={params.row.present}
          onCheckedChange={() => togglePresence(params.row.id, "manpower")}
        />
      )
    }
  ];
  const equipmentColumns: GridColDef[] = [
    { field: "id", headerName: "ID", hideable: false },
    {
      field: "warning",
      headerName: "Warning",
      renderCell: (params) => {
        if (params.value?.status) {
          return (
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} />
              <span className="text-red-500">{params.value.message}</span>
            </div>
          );
        } else {
          return (
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <span className="text-green-500">No Warning</span>
            </div>
          );
        }
      }
    },
    { field: "equipment", headerName: "Equipment", type: "string" },
    { field: "number", headerName: "Number", type: "string" },
    { field: "location", headerName: "Location", type: "string" },
    {
      field: "present",
      headerName: "Present",
      renderCell: (params) => (
        <Checkbox
          checked={params.row.present}
          onCheckedChange={() => togglePresence(params.row.id, "equipment")}
        />
      )
    }
  ];
  // Function to allow only numeric input
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      e.target.value = value; // Ensure only numbers
    } else {
      e.target.value = value.replace(/\D/g, ""); // Remove non-numeric characters
    }
  };
  const DataTable = ({
    columns,
    rows,
    title
  }: {
    columns: GridColDef[];
    rows: any[];
    title: string;
  }) => {
    return (
      <Card className=" max-w-full">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Button variant="outline" size="icon">
            <span className="text-xl">+</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div
            style={{ height: "100%",width:"100%" }}
            className="max-w-[100%]">
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              pageSizeOptions={[2, 5, 10, 25, 50, 100, 200]}
              disableRowSelectionOnClick
            />
          </div>
        </CardContent>
      </Card>
    );
  };
 const [activeTab, setActiveTab] = useState("site-info");
 
  const tabs = [
    { value: "site-info", label: "Site Informations" },
    { value: "tunnel-dimensions", label: "Create Tunnel Dimensionss" },
    { value: "report", label: "incident reporting" },
    { value: "tunnel-advancements", label: "Tunnel Advancementss" },
    { value: "blast-log", label: "Blast Log Detaill" },
    { value: "production", label: "production reporting" }
  ];
   interface Tab {
     value: string;
     label: string;
   }
     const handleTabClick = (tabId: string): void => {
       setActiveTab(tabId);
     };
  return (
    <div className="w-full  mx-auto p-2  sm:p-2 space-y-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4 w-full">
        <div className="flex items-center gap-4">
          <Select>
            <option value="">Select Company</option>
          </Select>
          <Input className="w-64" placeholder="Search..." />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-green-500 flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full" />
            SYSTEM ONLINE
          </div>
          <Select>
            <option value="">SITE INSPECTOR</option>
          </Select>
        </div>
      </div>
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
      <Tabs defaultValue="site-info" className="w-full">
        <TabsList className="grid w-full grid-cols-1  sm:grid-cols-4 md:grid-cols-6 h-full gap-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-amber-800 data-[state=active]:text-white data-[state=active]:border-amber-800 
  border-2 border-white flex items-center justify-center 
  text-xs sm:text-sm md:text-base 
  px-1 sm:px-2 md:px-4 
  py-1 sm:py-2 
  whitespace-normal h-auto min-h-10
  text-center">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="site-info">
          <SiteForm />
          <Card>
            <CardHeader>
              <CardTitle>Site Inspection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-w-[100%] h-full">
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

              <DataTable
                title="Roll Call Manpower on Site"
                columns={manpowerColumns}
                rows={manpowerData}
              />
              <DataTable
                title="Equipments"
                columns={equipmentColumns}
                rows={equipmentData}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tunnel-dimensions">
          {/* Tunnel Dimensions */}
          <TunnelDimensionForm
            tunnelId={tunnelId}
            onSubmitSuccess={handleFormSubmitSuccess}
          />
          {/*Tunnel Component*/}
          <TunnelComponentForm
            tunnelId={tunnelId}
            onSubmitSuccess={handleFormSubmitSuccess}
          />
          {/* <Card>
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
          </Card> */}

          {/* <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Tunnel Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

              <Input
                className="w-full"
                placeholder="crosscut, Drift (ID), Raise (ID), Winze (ID), Heading (ID), Siding (ID), Stope (ID)"
              />


              <div className="grid grid-cols-3 gap-4">

                <CustomSelect
                  options={[
                    { value: "id1", label: "ID 1" },
                    { value: "id2", label: "ID 2" }
                  ]}
                  placeholder="CrossCut (ID)"
                  onChange={setSelectedCrossCut}
                />


                <Input placeholder="Distance from main entry (m)" />
                <Input placeholder="Length dimensions (m)" />
                <Input placeholder="Deviation angle (degrees)" />
                <Input placeholder="Width dimensions (m)" />
                <Input placeholder="Height dimensions (m)" />


                <CustomSelect
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" }
                  ]}
                  placeholder="Supported"
                  onChange={setSelectedSupport}
                />

                <Input placeholder="Grade (%)" />
                <Textarea placeholder="Note" />
              </div>

              <Button variant="outline" className="ml-auto">
                Save
              </Button>
            </CardContent>
          </Card> */}
        </TabsContent>
        <TabsContent value="production">
          <Card>
            <CardHeader>
              <CardTitle>Production Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="Daily Production Plan" />
                <Input placeholder="Booked Meter" />
                <Input placeholder="Actual Meter" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="Variance" />
                <Input placeholder="Material excavated (Wagon)" />
                <Input placeholder="Waste excavated (Wagon)" />
              </div>
              <Button className="w-full">GENERATE TAG</Button>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Tunnel Advancements Tab Content */}
        <TabsContent value="tunnel-advancements">
          <Card>
            <CardHeader>
              <CardTitle>Tunnel Advancements</CardTitle>
            </CardHeader>
            <CardContent>
              <TunnelAdvancementForm
               tunnelId={tunnelId}
            onSubmitSuccess={handleFormSubmitSuccess}/>
              <form className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="advancement-date">Date</Label>
                      <Input id="advancement-date" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tunnel-select">Select Tunnel</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tunnel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tunnel-1">Tunnel #1</SelectItem>
                          <SelectItem value="tunnel-2">Tunnel #2</SelectItem>
                          <SelectItem value="tunnel-3">Tunnel #3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advancement-distance">
                      Advancement Distance (m)
                    </Label>
                    <Input
                      id="advancement-distance"
                      type="number"
                      step="0.1"
                      placeholder="Enter distance"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advancement-method">Method Used</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tbm">
                          Tunnel Boring Machine (TBM)
                        </SelectItem>
                        <SelectItem value="drill-blast">
                          Drill and Blast
                        </SelectItem>
                        <SelectItem value="natm">
                          New Austrian Tunneling Method
                        </SelectItem>
                        <SelectItem value="cut-cover">Cut and Cover</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advancement-notes">Notes</Label>
                    <Textarea
                      id="advancement-notes"
                      placeholder="Enter notes"
                      rows={4}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-amber-800 hover:bg-amber-900">
                  Record Advancement
                </Button>
              </form>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">
                  Recent Advancements
                </h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Tunnel</TableHead>
                        <TableHead>Distance (m)</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Cumulative (m)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2025-03-08</TableCell>
                        <TableCell>Tunnel #1</TableCell>
                        <TableCell>4.5</TableCell>
                        <TableCell>Drill and Blast</TableCell>
                        <TableCell>156.5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-03-07</TableCell>
                        <TableCell>Tunnel #1</TableCell>
                        <TableCell>5.2</TableCell>
                        <TableCell>Drill and Blast</TableCell>
                        <TableCell>152.0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-03-07</TableCell>
                        <TableCell>Tunnel #2</TableCell>
                        <TableCell>8.7</TableCell>
                        <TableCell>TBM</TableCell>
                        <TableCell>203.4</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Blast Log Detail Tab Content */}
        <TabsContent value="blast-log">
          <Card>
            <CardHeader>
              <CardTitle>Blast Log Detail</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blast-date">Blast Date</Label>
                      <Input id="blast-date" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blast-time">Blast Time</Label>
                      <Input id="blast-time" type="time" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blast-tunnel">Tunnel</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tunnel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tunnel-1">Tunnel #1</SelectItem>
                          <SelectItem value="tunnel-2">Tunnel #2</SelectItem>
                          <SelectItem value="tunnel-3">Tunnel #3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blast-location">Chainage (m)</Label>
                      <Input
                        id="blast-location"
                        type="number"
                        step="0.1"
                        placeholder="Enter chainage"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blast-pattern">Blast Pattern</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedge-cut">Wedge Cut</SelectItem>
                          <SelectItem value="burn-cut">Burn Cut</SelectItem>
                          <SelectItem value="v-cut">V-Cut</SelectItem>
                          <SelectItem value="fan-cut">Fan Cut</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hole-count">Number of Holes</Label>
                      <Input
                        id="hole-count"
                        type="number"
                        placeholder="Enter hole count"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="explosive-type">Explosive Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select explosive type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anfo">ANFO</SelectItem>
                          <SelectItem value="emulsion">Emulsion</SelectItem>
                          <SelectItem value="dynamite">Dynamite</SelectItem>
                          <SelectItem value="slurry">Slurry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="explosive-quantity">
                        Explosive Quantity (kg)
                      </Label>
                      <Input
                        id="explosive-quantity"
                        type="number"
                        step="0.1"
                        placeholder="Enter quantity"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blast-result">Blast Result</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="satisfactory">
                          Satisfactory
                        </SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blast-notes">Notes</Label>
                    <Textarea
                      id="blast-notes"
                      placeholder="Enter notes"
                      rows={4}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-amber-800 hover:bg-amber-900">
                  Record Blast
                </Button>
              </form>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">
                  Recent Blast Records
                </h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Tunnel</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Pattern</TableHead>
                        <TableHead>Explosive</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2025-03-08</TableCell>
                        <TableCell>14:30</TableCell>
                        <TableCell>Tunnel #1</TableCell>
                        <TableCell>156.5</TableCell>
                        <TableCell>Burn Cut</TableCell>
                        <TableCell>45.2 kg ANFO</TableCell>
                        <TableCell>Good</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-03-07</TableCell>
                        <TableCell>15:15</TableCell>
                        <TableCell>Tunnel #1</TableCell>
                        <TableCell>152.0</TableCell>
                        <TableCell>Burn Cut</TableCell>
                        <TableCell>43.8 kg ANFO</TableCell>
                        <TableCell>Excellent</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-03-06</TableCell>
                        <TableCell>14:45</TableCell>
                        <TableCell>Tunnel #1</TableCell>
                        <TableCell>146.8</TableCell>
                        <TableCell>Wedge Cut</TableCell>
                        <TableCell>40.5 kg ANFO</TableCell>
                        <TableCell>Satisfactory</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="report">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Incident Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {/* Incident Type Select */}
                <CustomSelect
                  options={[
                    { value: "type1", label: "Type 1" },
                    { value: "type2", label: "Type 2" }
                  ]}
                  placeholder="INCIDENT TYPE"
                  onChange={setIncidentType}
                />

                {/* Tunnel ID Select */}
                <CustomSelect
                  options={[
                    { value: "id1", label: "ID 1" },
                    { value: "id2", label: "ID 2" }
                  ]}
                  placeholder="TUNNEL ID"
                  onChange={setTunnelId}
                />

                {/* SOS People */}
                <Textarea
                  placeholder="SOS people"
                  value={sosPeople}
                  onChange={(e) => setSosPeople(e.target.value)}
                />

                {/* Full-Width Textareas */}
                <Textarea
                  placeholder="People involved"
                  className="col-span-3"
                  value={peopleInvolved}
                  onChange={(e) => setPeopleInvolved(e.target.value)}
                />

                <Textarea
                  placeholder="Root cause analysis"
                  className="col-span-3"
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                />

                <Textarea
                  placeholder="Measures taken"
                  className="col-span-3"
                  value={measuresTaken}
                  onChange={(e) => setMeasuresTaken(e.target.value)}
                />
              </div>

              {/* Save Button */}
              <Button variant="outline" className="ml-auto">
                Save
              </Button>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Additional Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                className="min-h-[200px]"
                placeholder="Enter additional comments..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
              <Button variant="outline" className="ml-auto">
                Save
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TunnelManagementSystem;
