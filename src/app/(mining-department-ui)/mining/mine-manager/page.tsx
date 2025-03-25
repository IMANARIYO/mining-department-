import Image from "next/image";
import { Bell, ChevronDown, Download, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart } from "@/components/line-chart";
import { DonutChart } from "@/components/donut-chart";
import { SitePerformanceTable } from "@/components/site-performance-table";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Header */}

      {/* Filters */}
      <div className="px-16 py-6">
        <div className="bg-white rounded-lg p-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">All Sites</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span className="font-medium">Monthly</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <Button className="ml-auto bg-[#8b6f4e] hover:bg-[#7a5f3e] text-white">
            Export
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="text-[#8b6f4e] border-[#8b6f4e]">
            Share
            <Upload className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="px-16 py-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Production
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="h-1 w-12 bg-[#8b6f4e]"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#8b6f4e]">
                    48,000
                  </div>
                  <div className="text-xl font-medium text-[#8b6f4e]">Tons</div>
                </div>
                <div className="h-1 w-12 bg-[#8b6f4e]"></div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trending-up">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span className="text-green-500 ml-1">
                  +5.2 % From last period
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Safety Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="h-1 w-12 bg-[#8b6f4e]"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#8b6f4e]">96.5%</div>
                </div>
                <div className="h-1 w-12 bg-[#8b6f4e]"></div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trending-up">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span className="text-green-500 ml-1">
                  +1.2 % From last period
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Equipment Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="h-1 w-12 bg-[#8b6f4e]"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#8b6f4e]">
                    88.75%
                  </div>
                </div>
                <div className="h-1 w-12 bg-[#8b6f4e]"></div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trending-up">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span className="text-green-500 ml-1">
                  +0.2 % From last period
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Operating Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="h-1 w-12 bg-[#8b6f4e]"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#8b6f4e]">
                    $2.3 M
                  </div>
                </div>
                <div className="h-1 w-12 bg-[#8b6f4e]"></div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trending-up">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span className="text-green-500 ml-1">
                  +2.1 % From last period
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Production Trends by Site</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart />
              </CardContent>
            </Card>
          </div>
          <div className="col-span-1">
            <Card className="h-full bg-[#8b6f4e] text-white">
              <CardHeader>
                <CardTitle className="text-white">Ranking Chart</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <DonutChart />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Site Performance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <SitePerformanceTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
