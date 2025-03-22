"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

import { toast } from "sonner";
import { DataTable } from "@/components/tablesUtils/data-table";
import TunnelComponentForm from "./TunnelComponentForm";
import { type TunnelComponent, columns } from "./tunnel-components-columns";
import { getTunnelComponents } from "@/services/tunnelComponentService";

interface TunnelComponentsPageProps {
  tunnelId: string;
}

export default function TunnelComponentsPage({
  tunnelId
}: TunnelComponentsPageProps) {
  const [data, setData] = useState<TunnelComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch tunnel components data
  const fetchTunnelComponentsData = async () => {
    try {
      setLoading(true);
      const result = await getTunnelComponents();

      // Filter components for the current tunnel if tunnelId is provided
      const filteredData = tunnelId
        ? result.data.filter(
            (comp: TunnelComponent) => comp.tunnelId === tunnelId
          )
        : result.data;

      setData(filteredData || []);
    } catch (error) {
      console.error("Error fetching tunnel components:", error);
      toast.error("Failed to load tunnel components");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tunnelId) {
      fetchTunnelComponentsData();
    }
  }, [tunnelId]);

  const handleSuccess = () => {
    // Refresh data after changes
    fetchTunnelComponentsData();
    // Hide the form after successful submission
    setShowForm(false);
  };

  if (!tunnelId) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Please select a tunnel to view components</p>
      </div>
    );
  }

  return (
    <div className="container w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tunnel Components</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add component
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
          <TunnelComponentForm
            tunnelId={tunnelId}
            onSubmitSuccess={handleSuccess}
          />
        </div>
      )}

      <div className="w-full overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading components...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
