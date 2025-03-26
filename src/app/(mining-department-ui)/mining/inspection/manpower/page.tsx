"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

import { toast } from "sonner";
import { DataTable } from "@/components/tablesUtils/data-table";
import { deleteManpower, getAllManpower, updateManpower } from "@/services/manapowerService";
import { manpowerColumns } from "./manpowerColumns ";
import ManpowerForm from "./ManpowerForm";


interface ManpowerPageProps {
  tunnelId?: string;
}

export const ManpowerPage: React.FC<ManpowerPageProps> = ({ tunnelId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [manpowerData, setManpowerData] = useState([]);

  // Load data function
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllManpower(tunnelId);
      setManpowerData(data.data);
    } catch (error) {
      console.error("Failed to load manpower data:", error);
      toast.error("Failed to load manpower records");
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
    if (manpowerData.length === 0) {
      loadData();
    }
  }, [tunnelId]); // Add tunnelId to dependency array to refetch if tunnel changes

  // Handle form submission success internally
  const handleFormSuccess = () => {
    setShowForm(false); // Hide form after submission
    refetchData(); // Reload the data after form submission
  };

  // Get columns with refetch function to pass delete/update actions
  const columns = manpowerColumns({
    refetchData,
    onDelete: deleteManpower,
    onUpdate: updateManpower,
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Manpower Records</h1>
        {!showForm ? (
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Manpower Record
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
          <ManpowerForm
            tunnelId={tunnelId}
            onSubmitSuccess={handleFormSuccess}
          />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Manpower Management</CardTitle>
          <CardDescription>
            View and manage manpower records for this tunnel
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
            <DataTable columns={columns} data={manpowerData} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
