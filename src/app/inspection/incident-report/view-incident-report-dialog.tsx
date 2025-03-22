"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getIncidentReportById } from "@/services/incidentReportService";

type ViewIncidentReportProps = {
  reportId?: string;
  report?: any;
  trigger?: React.ReactNode;
};

export function ViewIncidentReport({
  reportId,
  report: initialReport,
  trigger
}: ViewIncidentReportProps) {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<any>(initialReport);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchIncidentReport = async () => {
    if (!open) return;

    const id = reportId || initialReport?.id;
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getIncidentReportById(id);
      setReport(response.data);
    } catch (err) {
      console.error("Error fetching incident report:", err);

      if (!initialReport) {
        setError("Failed to load complete incident report details");
        toast.error("Failed to load complete incident report details");
      } else {
        toast.error("Couldn't fetch additional details");
      }
    } finally {
      setLoading(false);
    }
  };

  // Set initial report for immediate display
  if (initialReport) {
    setReport(initialReport);
  }

  fetchIncidentReport();
}, [open, reportId, initialReport]);

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // Helper to get incident type label
  const getIncidentTypeLabel = (type: string) => {
    const types = {
      injury: "Personnel Injury",
      equipment: "Equipment Damage",
      structural: "Structural Issue",
      environmental: "Environmental Incident",
      "near-miss": "Near Miss",
      other: "Other"
    };
    return types[type as keyof typeof types] || type;
  };

  const defaultTrigger = trigger || (
    <Button variant="outline" size="sm">
      <Eye className="mr-2 h-4 w-4" />
      View Details
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Incident Report Details</DialogTitle>
          <DialogDescription>
            Detailed information about this incident.
          </DialogDescription>
        </DialogHeader>

        {loading && !report && (
          <div className="py-8 text-center">Loading report details...</div>
        )}

        {error && !report && (
          <div className="py-8 text-center text-red-500">{error}</div>
        )}

        {report && (
          <div className="space-y-4 py-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {getIncidentTypeLabel(report.incidentType)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    People Involved
                  </h3>
                  <p className="mt-1">{report.peopleInvolved}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Root Cause Analysis
                  </h3>
                  <p className="mt-1 whitespace-pre-line">
                    {report.rootCauseAnalysis || "Not provided"}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Measures Taken
                  </h3>
                  <p className="mt-1 whitespace-pre-line">
                    {report.measuresTaken || "Not provided"}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Report ID
                    </h3>
                    <p className="mt-1 text-sm truncate" title={report.id}>
                      {report.id}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Tunnel ID
                    </h3>
                    <p
                      className="mt-1 text-sm truncate"
                      title={report.tunnelId}>
                      {report.tunnelId}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Created At
                    </h3>
                    <p className="mt-1 text-sm">
                      {formatDate(report.createdAt)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Last Updated
                    </h3>
                    <p className="mt-1 text-sm">
                      {formatDate(report.updatedAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {loading && (
              <div className="text-center py-2 text-sm text-muted-foreground">
                Loading additional details...
              </div>
            )}

            {report.comments && report.comments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    Comments ({report.comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {report.comments.map((comment: any) => (
                      <li key={comment.id} className="border-b pb-2">
                        <p className="whitespace-pre-line">{comment.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {comment.author} - {formatDate(comment.createdAt)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
