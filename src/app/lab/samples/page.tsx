"use client";

import {
  Bell,
  ChevronDown,
  FileText,
  Share2,
  BarChart2,
  Send
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SamplePieChart } from "@/components/sample-pie-chart";


export default function Dashboard() {
  const samples = [
    {
      id: "SAM-25-001",
      type: "Ore Sample",
      status: "Completed",
      date: "Jan 15, 2025"
    },
    {
      id: "2025-03-03 10:30 AM",
      type: "Water Sample",
      status: "Pending",
      date: "Jan 15, 2025"
    },
    {
      id: "2025-03-03 10:30 AM",
      type: "Biohazard",
      status: "Rejected",
      date: "Jan 15, 2025"
    }
  ];

  const recentActivities = [
    { id: 1, title: "New sample Added", time: "2 Minitus Ago", icon: Send },
    { id: 2, title: "Report Generated", time: "2 Minitus Ago", icon: FileText }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600">
            Completed
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-400 hover:bg-yellow-500 text-black">
            Pending
          </Badge>
        );
      case "Rejected":
        return <Badge className="bg-red-400 hover:bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-md bg-[#8B6D4B] px-4 py-2 text-white">
              <span>Laboratory</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-md bg-[#8B6D4B] text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="flex items-center gap-2 rounded-full border px-2 py-1 pr-4 bg-gray-100">
              <ChevronDown className="h-4 w-4" />
              <div className="flex flex-col text-sm">
                <span className="font-medium">Kelvin R.</span>
                <span className="text-xs text-muted-foreground">
                  Managing Director
                </span>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>KR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Quick Action Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Quick Action</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="border">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <p className="text-2xl font-bold">247</p>
                      <p className="text-sm text-muted-foreground">
                        New Insight
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <FileText className="h-6 w-6 mb-1" />
                      <p className="text-sm text-muted-foreground">
                        Generate Report
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <BarChart2 className="h-6 w-6 mb-1" />
                      <p className="text-sm text-muted-foreground">Analysis</p>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <Share2 className="h-6 w-6 mb-1" />
                      <p className="text-sm text-muted-foreground">
                        Share Data
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Sample Management Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Sample Management</h2>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead className="w-[200px]">Sample ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {samples.map((sample) => (
                        <TableRow key={sample.id}>
                          <TableCell className="font-medium">
                            {sample.id}
                          </TableCell>
                          <TableCell>{sample.type}</TableCell>
                          <TableCell>{getStatusBadge(sample.status)}</TableCell>
                          <TableCell className="text-right">
                            {sample.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Recent Activity Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <activity.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sample Pie Chart */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Sample pie chart</h2>
                <div className="flex justify-center">
                  <SamplePieChart />
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-100">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Total Samples</p>
                  <p className="text-2xl font-bold">247</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">247</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
