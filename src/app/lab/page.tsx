"use client";

import type React from "react";
import {
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Send,
  Clock,
  CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
function BarChart() {
  return (
    <div className="w-full h-full flex items-end justify-between gap-2">
      <div className="h-[30%] w-12 bg-amber-600 rounded-t"></div>
      <div className="h-[80%] w-12 bg-amber-600 rounded-t"></div>
      <div className="h-[60%] w-12 bg-amber-600 rounded-t"></div>
      <div className="h-[25%] w-12 bg-amber-600 rounded-t"></div>
      <div className="h-[50%] w-12 bg-amber-600 rounded-t"></div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster richColors position="top-right" />
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="bg-amber-800 text-white hover:bg-amber-700 hover:text-white px-4 py-2 h-auto">
              Laboratory
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-amber-700 text-white hover:bg-amber-600 hover:text-white h-10 w-10">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-100">
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-4 py-2 rounded-full border">
            <span>Kelvin R.</span>
            <span className="text-xs text-gray-500">Managing Director</span>
            <ChevronDown className="h-4 w-4" />
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>KR</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Samples Today"
            value="247"
            change="+12.5% From Yesterday"
            positive={true}
          />
          <MetricCard
            title="Analyses Completed"
            value="189"
            change="+5.3% From Yesterday"
            positive={true}
          />
          <MetricCard
            title="Avg. Turnaround Time"
            value="4.2h"
            change="-0.5h From Last Week"
            positive={true}
          />
          <MetricCard
            title="Pending Analyses"
            value="58"
            change="Critical: 12"
            positive={false}
            critical={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">
                Resources Utilization VS Advancement Progress per Tunnel
              </h2>
              <div className="h-64 pt-4">
                <ImprovedBarChart />
              </div>
            </CardContent>
          </Card> */}
           <Card>
                      <CardContent className="p-6">
                        <h2 className="text-lg font-medium mb-4">
                          Resources Utilization VS Advancement Progress per Tunnel
                        </h2>
                        <div className="h-64">
                          <BarChart />
                        </div>
                      </CardContent>
                    </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Sample pie chart</h2>
              <div className="flex justify-center">
                <ImprovedPieChart />
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                <LegendItem color="#8B6F4E" label="Data here" />
                <LegendItem color="#3B0764" label="Data here" />
                <LegendItem color="#D6B088" label="Data here" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Sample pie chart</h2>
              <div className="flex justify-center">
                <ImprovedPieChart />
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                <LegendItem color="#8B6F4E" label="Data here" />
                <LegendItem color="#3B0764" label="Data here" />
                <LegendItem color="#D6B088" label="Data here" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  <ActivityItem
                    icon={<Send className="h-4 w-4 text-blue-500" />}
                    title="New sample collected at Zone B-7"
                    subtitle="Sample ID: MIN- 2025 - 02234"
                    time="2 Mintus Ago"
                    color="bg-blue-100"
                  />
                  <ActivityItem
                    icon={<Clock className="h-4 w-4 text-amber-500" />}
                    title="Analysis Completed"
                    subtitle="Bath: B-2025-089"
                    time="15 Minutes Ago"
                    color="bg-amber-100"
                  />
                  <ActivityItem
                    icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                    title="Critical Alert"
                    subtitle="High Cooper Content Detected"
                    time="30 Minutes"
                    color="bg-green-100"
                  />
                  <ActivityItem
                    icon={<Clock className="h-4 w-4 text-amber-500" />}
                    title="Analysis Completed"
                    subtitle="Bath: B-2025-089"
                    time="15 Minutes Ago"
                    color="bg-amber-100"
                  />
                  <ActivityItem
                    icon={<Clock className="h-4 w-4 text-amber-500" />}
                    title="Analysis Completed"
                    subtitle="Bath: B-2025-089"
                    time="15 Minutes Ago"
                    color="bg-amber-100"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <ActionButton
                    label="Register New Sample"
                    onClick={() =>
                      toast.info("Opening sample registration form")
                    }
                  />
                  <ActionButton
                    label="View All Samples"
                    onClick={() => toast.info("Loading all samples")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  positive = false,
  critical = false
}: {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  critical?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-amber-800">{value}</h3>
            <p
              className={`text-sm mt-1 ${
                critical
                  ? "text-red-600 font-medium"
                  : positive
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
              {change}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowUpRight className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ImprovedBarChart() {
  // Data for the bar chart (heights in percentage)
  const data = [30, 80, 60, 25, 50];

  return (
    <div className="relative w-full h-full">
      {/* Y-axis line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>

      {/* X-axis line */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200"></div>

      {/* Bars container */}
      <div className="absolute inset-0 flex items-end justify-around pb-6">
        {data.map((height, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-16 bg-amber-600/80 rounded-t"
              style={{ height: `${height}%` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImprovedPieChart() {
  return (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Brown segment (60%) */}
        <path
          d="M50,50 L50,10 A40,40 0 0,1 83.6,73.6 Z"
          fill="#8B6F4E"
          stroke="white"
          strokeWidth="1"
        />

        {/* Purple segment (25%) */}
        <path
          d="M50,50 L83.6,73.6 A40,40 0 0,1 29.4,89.6 Z"
          fill="#3B0764"
          stroke="white"
          strokeWidth="1"
        />

        {/* Beige segment (15%) */}
        <path
          d="M50,50 L29.4,89.6 A40,40 0 0,1 16.4,26.4 A40,40 0 0,1 50,10 Z"
          fill="#D6B088"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-sm"
        style={{ backgroundColor: color }}></div>
      <span className="text-xs">{label}</span>
    </div>
  );
}

function ActivityItem({
  icon,
  title,
  subtitle,
  time,
  color
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  time: string;
  color: string;
}) {
  return (
    <div className="flex gap-3">
      <div className={`mt-1 p-2 rounded-full ${color}`}>{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{title}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  onClick
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      className="w-full justify-between border-amber-200 text-amber-800 hover:bg-amber-50"
      onClick={onClick}>
      {label}
      <ArrowRight className="h-5 w-5" />
    </Button>
  );
}
