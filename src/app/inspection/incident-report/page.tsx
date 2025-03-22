"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

import { getAllIncidentReports } from "@/services/incidentReportService";
import { toast } from "sonner";
import { getColumns } from "./incident-report-columns";
import { DataTable } from "@/components/tablesUtils/data-table";
import IncidentReportForm from "./IncidentReportForm";

interface IncidentReportPageProps {
  tunnelId: string;
}

export const IncidentReportPage: React.FC<IncidentReportPageProps> = ({
  tunnelId
}) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Load data function
  const loadData = async () => {
    setIsLoading(true);
    try {
      const reportData = await getAllIncidentReports();
      setReports(reportData.data);
    } catch (error) {
      console.error("Failed to load data:", error);
      toast.error("Failed to load incident reports");
    } finally {
      setIsLoading(false);
    }
  };

  // Refetch function
  const refetchData = () => {
    loadData();
  };

  useEffect(() => {
    // Fetch data only once when the component is first mounted
    if (reports.length === 0) {
      loadData();
    }
  }, []); // Empty dependency array ensures it only runs once when the component mounts.

  // Handle form submission success internally
  const handleFormSuccess = () => {
    setShowForm(false); // Hide form after submission
    refetchData(); // Reload the data after form submission
  };

  // Get columns with refetch function
  const columns = getColumns({ refetch: refetchData });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Incident Reports</h1>
        {!showForm ? (
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Incident Report
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setShowForm(false)}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 p-6 border rounded-lg bg-muted/40">
          <IncidentReportForm
            tunnelId={tunnelId}
            userId={"exampleUserId"} // Replace with the actual userId value
            onSubmitSuccess={handleFormSuccess} // Pass the internal success handler
          />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Incident Reports</CardTitle>
          <CardDescription>
            View and manage all incident reports for this tunnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="container mx-auto py-6 space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <DataTable columns={columns} data={reports} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
