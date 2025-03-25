"use client";

import React, { useState } from "react";
import DataTable from "@/components/DataTable"; // Assuming this is the file path to your DataTable component
import { Button } from "@/components/ui/button";

const DummyDataPage = () => {
  const [loading, setLoading] = useState(false);

  const columns = [
    "Date",
    "Tunnel",
    "Distance (m)",
    "Method",
    "Cumulative (m)",
    "Location",
    "Supervisor",
    "Status"
  ];

  // Dummy rows for testing
  const rows = [
    {
      Date: "2025-03-08",
      Tunnel: "Tunnel #1",
      "Distance (m)": 4.5,
      Method: "Drill and Blast",
      "Cumulative (m)": 156.5,
      Location: "Tunnel 1 / Wing 1",
      Supervisor: "John Doe",
      Status: "Completed"
    },
    {
      Date: "2025-03-07",
      Tunnel: "Tunnel #1",
      "Distance (m)": 5.2,
      Method: "Drill and Blast",
      "Cumulative (m)": 152.0,
      Location: "Tunnel 1 / Wing 1",
      Supervisor: "Jane Smith",
      Status: "In Progress"
    },
    {
      Date: "2025-03-07",
      Tunnel: "Tunnel #2",
      "Distance (m)": 8.7,
      Method: "TBM",
      "Cumulative (m)": 203.4,
      Location: "Tunnel 2 / Wing 2",
      Supervisor: "Bob Brown",
      Status: "Completed"
    }
  ];

  // Actions for each row (Edit/Delete)
  interface RowData {
    Date: string;
    Tunnel: string;
    "Distance (m)": number;
    Method: string;
    "Cumulative (m)": number;
    Location: string;
    Supervisor: string;
    Status: string;
  }

  interface ActionProps {
    row: RowData;
  }

  const actions = (row: RowData): JSX.Element[] => [
    <Button
      key={`edit-${row.Date}`}
      size="sm"
      variant="outline"
      onClick={() => alert(`Editing ${row.Tunnel}`)}>
      Edit
    </Button>,
    <Button
      key={`delete-${row.Date}`}
      size="sm"
      variant="destructive"
      onClick={() => alert(`Deleting ${row.Tunnel}`)}>
      Delete
    </Button>
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tunnel Advancements</h2>
      <DataTable
        columns={columns}
        rows={rows}
        // actions={actions}
        loading={loading}
        title="Recent Advancements"
      />
    </div>
  );
};

export default DummyDataPage;
