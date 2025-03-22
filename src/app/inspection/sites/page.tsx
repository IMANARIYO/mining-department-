"use client";

import { useState, useEffect } from "react";

import { type Site, columns } from "./site-columns";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

import { DataTable } from "@/components/tablesUtils/data-table";
import SiteFormSection from "./SiteFormSection";
import { useSiteStore } from "@/siteStore";

export default function SitesPage() {


  const [showForm, setShowForm] = useState(false);
const { mineSites, fetchSitesData, loading } = useSiteStore();

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
    <div className=" w-full overflow-x-hidden">
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

      <div className=" overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading sites...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={mineSites} />
        )}
      </div>
    </div>
  );
}
