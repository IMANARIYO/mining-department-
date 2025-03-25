"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, CheckCircle } from "lucide-react";
import FilterBar from "../../components/minesTunnelsFilterBar";
import TunnelDimensionTabs from "./TunnelDimensionTabs"
import SitesPage from "./sites/page";
import { TunnelAdvancementPage } from "./tunnel-advancement/page";
import { useSiteStore } from "@/siteStore";
import { IncidentReportPage } from "./incident-report/page";
import BlastLogPage from "../blasting/page";
import { ProductionReportPage } from "./productionReport/page";

const TunnelManagementSystem = () => {
  const { fetchSitesData, loading } = useSiteStore();

  useEffect(() => {
    fetchSitesData();
  }, []);

  const [filters, setFilters] = useState({
    selectedMineSite: null as { id: string; name: string } | null,
    selectedTunnel: null as { id: string; name: string } | null,
    selectedShift: null as string | null,
    selectedDate: undefined as Date | undefined
  });

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

  const [tunnelId, setTunnelId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (filters.selectedTunnel) {
      setTunnelId(filters.selectedTunnel.id);
    } else {
      setTunnelId(undefined);
    }
  }, [filters.selectedTunnel]);

  const handleFormSubmitSuccess = () => {
    console.log("Tunnel dimension created successfully!");
  };

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
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Button variant="outline" size="icon">
            <span className="text-xl">+</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div
            style={{ height: "100%", width: "100%" }}
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


  const tabs = [
    { value: "site-info", label: "Site Informations" },
    { value: "tunnel-dimensions", label: "Create Tunnel Dimensionss" },
    { value: "report", label: "incident reporting" },
    { value: "tunnel-advancements", label: "Tunnel Advancementss" },
    { value: "blast-log", label: "Blast Log Detaill" },
    { value: "production", label: "production reporting" },
    { value: "manpower-Equipmant", label: "equipmentsand man power" }
  ];
  const tunnelDimensionTabs = [
    { value: "tunnel-dimensions", label: "Tunnel Dimensions" },
    { value: "tunnel-components", label: "Tunnel Components" }
  ];

  interface Tab {
    value: string;
    label: string;
  }
  return (
    <div className="w-full  mx-auto p-2  sm:p-2 space-y-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4 w-full">
        <div className="flex items-center gap-4">
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
      <FilterBar onFilterChange={setFilters} />

      <Tabs defaultValue="site-info">
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
          <SitesPage />
        </TabsContent>
        <TabsContent value="manpower-Equipmant">
          {" "}
          <Card>
            <CardHeader>
              <CardTitle>Site Inspection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-w-[100%] h-full">
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
          <TunnelDimensionTabs
            tunnelId={tunnelId || ""}
            handleFormSubmitSuccess={handleFormSubmitSuccess}
          />
        </TabsContent>
        <TabsContent value="production">
          <ProductionReportPage tunnelId={tunnelId || ""} />
        </TabsContent>
        {/* Tunnel Advancements Tab Content */}
        <TabsContent value="tunnel-advancements">
          <Card>
            <CardHeader>
              <CardTitle>Tunnel Advancements</CardTitle>
            </CardHeader>
            <CardContent>
              <TunnelAdvancementPage tunnelId={tunnelId || ""} />
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
              <BlastLogPage tunnelId={tunnelId || ""} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="report">
          <IncidentReportPage tunnelId={tunnelId || ""} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TunnelManagementSystem;
