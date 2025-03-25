"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/tablesUtils/data-table";

import { type BlastLog, columns } from "./blast-log-columns";
import { getBlastLogs } from "@/services/blastService";
import BlastingForm from "./BlastingForm";


interface BlastLogPageProps {
  tunnelId: string;
}

export default function BlastLogPage({ tunnelId }: BlastLogPageProps) {
  const [data, setData] = useState<BlastLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch blast logs data
  const fetchBlastLogsData = async () => {
    try {
      setLoading(true);
      const result = await getBlastLogs();

      // Filter logs for the current tunnel if tunnelId is provided
      const filteredData = tunnelId
        ? result.data.filter((log: BlastLog) => log.tunnelId === tunnelId)
        : result.data;

      setData(filteredData || []);
    } catch (error) {
      console.error("Error fetching blast logs:", error);
      toast.error("Failed to load blast logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tunnelId) {
      fetchBlastLogsData();
    }
  }, [tunnelId]);

  const handleSuccess = () => {
    // Refresh data after changes
    fetchBlastLogsData();
    // Hide the form after successful submission
    setShowForm(false);
  };

  if (!tunnelId) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Please select a tunnel to view blast logs</p>
      </div>
    );
  }

  return (
    <div className="container w-full overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blast Logs</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Blast Log
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
          <BlastingForm tunnelId={tunnelId} onSubmitSuccess={handleSuccess} />
        </div>
      )}

      <div className="w-full overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading blast logs...</p>
          </div>
        ) : (
          <DataTable columns={columns(fetchBlastLogsData)} data={data} />
        )}
      </div>
    </div>
  );
}
