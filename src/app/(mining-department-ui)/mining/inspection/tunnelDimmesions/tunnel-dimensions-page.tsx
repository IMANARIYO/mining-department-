"use client";

import { useState, useEffect } from "react";

import { type TunnelDimension, columns } from "./tunnel-dimension-columns";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { getAllTunnelDimensions } from "@/services/tunnelDimensionService";

import { toast } from "sonner";
import TunnelDimensionForm from "./TunnelDimensionForm";
import { DataTable } from "@/components/tablesUtils/data-table";

interface TunnelDimensionsPageProps {
  tunnelId: string;
}

export default function TunnelDimensionsPage({
  tunnelId
}: TunnelDimensionsPageProps) {
  const [data, setData] = useState<TunnelDimension[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch tunnel dimensions data
  const fetchTunnelDimensionsData = async () => {
    try {
      setLoading(true);
      const result = await getAllTunnelDimensions();

      // Filter dimensions for the current tunnel if tunnelId is provided
      const filteredData = tunnelId
        ? result.data.filter(
            (dim: TunnelDimension) => dim.tunnelId === tunnelId
          )
        : result.data;

      setData(filteredData || []);
    } catch (error) {
      console.error("Error fetching tunnel dimensions:", error);
      toast.error("Failed to load tunnel dimensions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tunnelId) {
      fetchTunnelDimensionsData();
    }
  }, [tunnelId]);

  const handleSuccess = () => {
    // Refresh data after changes
    fetchTunnelDimensionsData();
    // Hide the form after successful submission
    setShowForm(false);
  };

  if (!tunnelId) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Please select a tunnel to view dimensions</p>
      </div>
    );
  }

  return (
    <div className="container   w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tunnel Dimensions</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Dimension
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
          <TunnelDimensionForm
            tunnelId={tunnelId}
            onSubmitSuccess={handleSuccess}
          />
        </div>
      )}

      <div className="w-full overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading dimensions...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
