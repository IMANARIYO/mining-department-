"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IncidenceReport } from "@/components/mining/incidence";
import { ProductionReport } from "@/components/mining/production";
import FilterBar from "@/components/minesTunnelsFilterBar";
import { useSiteStore } from "@/siteStore";
import { toast } from "sonner";
import { getProductionReportsByTunnel } from "@/services/productionReportService";
import { productionReportcolumns } from "../inspection/productionReport/productionReportColumns";
import { DataTable } from "@/components/tablesUtils/data-table";
import { IncidentReportPage } from "../inspection/incident-report/page";

export default function ProductionPage() {
  const { fetchSitesData } = useSiteStore();
  const [tunnelId, setTunnelId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    selectedMineSite: null as { id: string; name: string } | null,
    selectedTunnel: null as { id: string; name: string } | null,
    selectedShift: null as string | null,
    selectedDate: undefined as Date | undefined
  });

  // Fetch reports function
  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const response = await getProductionReportsByTunnel(
        filters.selectedTunnel?.id || ""
      );
      setReports(response.data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      toast.error("Failed to fetch production reports");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch reports when selectedTunnel changes
  useEffect(() => {
    if (!filters.selectedTunnel) {
      setReports([]); 
      return;
    }

    fetchReports();
    setTunnelId(filters.selectedTunnel.id);
  }, [filters.selectedTunnel]); // Runs when the selected tunnel changes

  // Load mine sites on mount
  useEffect(() => {
    fetchSitesData();
  }, []);

  // Get columns with refetch function
  const productionColumns = productionReportcolumns({
    refetchData: () => fetchReports()
  });

  return (
    <div className="p-6">
      {/* Filter Bar */}
      <FilterBar onFilterChange={setFilters} />

      {/* Tab Navigation */}
      <Tabs defaultValue="production" className="mt-2 w-full">
        <TabsList className="mb-8 bg-transparent">
          <TabsTrigger
            value="production"
            className="px-6 py-2 rounded-md data-[state=active]:bg-[#a17d55] data-[state=active]:text-white bg-white border border-gray-200">
            Production
          </TabsTrigger>
          <TabsTrigger
            value="incidence"
            className="px-6 py-2 rounded-md ml-2 data-[state=active]:bg-[#a17d55] data-[state=active]:text-white bg-white border border-gray-200">
            Incidence Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="production">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div>
              <ProductionReport columns={productionColumns} data={reports} />
              {/* <DataTable columns={productionColumns} data={reports} /> */}
            </div>
          )}
        </TabsContent>

        <TabsContent value="incidence">
          {/* <IncidenceReport /> */}
                    <IncidentReportPage tunnelId={tunnelId || ""} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
