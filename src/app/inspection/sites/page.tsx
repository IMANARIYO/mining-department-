"use client";

import { useState, useEffect } from "react";

import { type Site, columns } from "./site-columns";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { getSites } from "@/services/siteService";

import { toast } from "sonner";

import { DataTable } from "@/components/tablesUtils/data-table";
import SiteFormSection from "./SiteFormSection";

export default function SitesPage() {
  const [data, setData] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch sites data
  const fetchSitesData = async () => {
    try {
      setLoading(true);
      const result = await getSites();
      setData(result.data || []);
    } catch (error) {
      console.error("Error fetching sites:", error);
      toast.error("Failed to load sites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSitesData();
  }, []);

  const handleSuccess = () => {
    // Refresh data after changes
    fetchSitesData();
    // Hide the form after successful submission
    setShowForm(false);
  };

  return (
    <div className=" container w-[100vw] md:w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sites</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Site
          </Button>
        )}
        {showForm && (
          <Button variant="outline" onClick={() => setShowForm(false)}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 p-6 border rounded-lg bg-muted/40">
          <SiteFormSection onSubmitSuccess={handleSuccess} />
        </div>
      )}

      <div className="w-full overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading sites...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
