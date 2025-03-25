import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share, FileText, Plus, LineChart } from "lucide-react";

interface Sample {
  id: string;
  type: string;
  status: string;
  date: string;
}

interface Activity {
  type: string;
  time: string;
}

const MinelabDashboard = () => {
  const samples: Sample[] = [
    {
      id: "SAM-2025-001",
      type: "Ore Sample",
      status: "In Progress",
      date: "Jan 15, 2025"
    },
    {
      id: "SAM-2025-002",
      type: "Water Sample",
      status: "Completed",
      date: "Jan 14, 2025"
    }
  ];

  const recentActivity: Activity[] = [
    { type: "New Sample Added", time: "2 minutes ago" },
    { type: "Report Generated", time: "15 minutes ago" }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">MineLab Data Hub</h1>
        <div className="flex gap-4">
          <div className="w-6 h-6">🔔</div>
          <div className="w-6 h-6">👤</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-6 border-b pb-2">
        <span className="font-medium">Dashboard</span>
        <span className="text-gray-600">Samples</span>
        <span className="text-gray-600">Reports</span>
        <span className="text-gray-600">Analysis</span>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <Plus className="w-6 h-6" />
              <span className="text-sm">New Sample</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <FileText className="w-6 h-6" />
              <span className="text-sm">Generate Report</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <LineChart className="w-6 h-6" />
              <span className="text-sm">Analysis</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <Share className="w-6 h-6" />
              <span className="text-sm">Share Data</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Sample Management */}
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sample Management</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4">Sample ID</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {samples.map((sample) => (
                    <tr key={sample.id} className="border-t">
                      <td className="py-4">{sample.id}</td>
                      <td className="py-4">{sample.type}</td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            sample.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}>
                          {sample.status}
                        </span>
                      </td>
                      <td className="py-4">{sample.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {activity.type.includes("Sample") ? "🧪" : "📄"}
                    </div>
                    <div>
                      <div className="font-medium">{activity.type}</div>
                      <div className="text-sm text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gray-50 rounded-lg mb-4" />
              <div className="flex justify-between">
                <div>
                  <div className="text-sm text-gray-500">Total Samples</div>
                  <div className="text-2xl font-bold">1,234</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Pending</div>
                  <div className="text-2xl font-bold text-orange-600">56</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MinelabDashboard;
