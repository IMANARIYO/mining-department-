"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUp,
  CheckCircle,
  Clock,
  Info,
  ChevronDown,
  CalendarDays,
} from "lucide-react";
import Image from "next/image";
import { TargetProgressTracking } from "@/components/mining/targetProgress";

export default function ReportsPage() {
  const [periodView, setPeriodView] = useState("daily");
  const [shiftData] = useState([
    {
      target: 400,
      actual: 300,
      shift: "Morning Shift",
      item: "Item A",
      status: "On Track",
      statusColor: "text-blue-500",
      icon: <CheckCircle className="h-5 w-5 text-blue-500" />,
    },
    {
      item: "Item B",
      target: 400,
      actual: 410,
      shift: "Afternoon Shift",
      status: "Exceeded",
      statusColor: "text-green-500",
      icon: <ArrowUp className="h-5 w-5 text-green-500" />,
    },
    {
      item: "Item C",
      target: 400,
      actual: 380,
      shift: "Night Shift",
      status: "Minor Delay",
      statusColor: "text-amber-500",
      icon: <Clock className="h-5 w-5 text-amber-500" />,
    },
  ]);

  const [alerts] = useState([
    {
      id: 1,
      title: "Crew Lead A",
      description: "Lorem ipsum dolor sit amet consectetur...",
      time: "Today, 07:13 AM",
      priority: "Urgent",
    },
    {
      id: 2,
      title: "Crew Lead A",
      description: "Lorem ipsum dolor sit amet consectetur...",
      time: "Today, 07:07 AM",
      priority: "Urgent",
    },
    {
      id: 3,
      title: "Crew Lead A",
      description: "Lorem ipsum dolor sit amet consectetur...",
      time: "Yesterday",
      priority: "Urgent",
    },
  ]);

  const [actionItems] = useState([
    "End shift inspection submission required from A",
    "End shift inspection submission required from A",
    "End shift inspection submission required from A",
  ]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Period Selector */}
      <div className="mb-6 flex justify-start">
        <Tabs
          defaultValue="daily"
          className="w-fit"
          onValueChange={setPeriodView}
        >
          <TabsList className="bg-[#f5f5f4]">
            <TabsTrigger
              value="daily"
              className={`px-6 ${
                periodView === "daily" ? "bg-[#a17d55] text-white" : ""
              }`}
            >
              Daily
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className={`px-6 ${
                periodView === "weekly" ? "bg-[#a17d55] text-white" : ""
              }`}
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className={`px-6 ${
                periodView === "monthly" ? "bg-[#a17d55] text-white" : ""
              }`}
            >
              Monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shift Operations Card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-[#5c4731]">
                Shift Operations
              </h2>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4" />
                <span className="text-sm mx-2">Today</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {shiftData.map((item, index) => (
                <div
                  key={index}
                  className="border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm">
                        Target: {item.target} Tons
                      </span>
                    </div>
                    <div>
                      <Image
                        src="/imgs/shifts.svg"
                        alt="Shift"
                        width={50}
                        height={50}
                      />
                      <span className="text-xs text-gray-500">
                        {item.shift}
                      </span>
                    </div>

                    <div className="items-center">
                      <span className="mr-2">Actual: {item.actual} Tons</span>
                      <div className="flex items-center">
                        <span className={`text-xs ${item.statusColor} mr-1`}>
                          {item.status}
                        </span>
                        {item.icon}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#5c4731]">{item.item}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Target Progress Tracking */}
        <TargetProgressTracking />

        {/* Second Shift Operations (Actions Required) */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-[#5c4731]">
                Shift Operations
              </h2>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4" />
                <span className="text-sm mx-2">Today</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-sm">{alert.title}</span>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {alert.description}
                  </p>
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">
                    {alert.priority}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Required Actions */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium text-[#5c4731] mb-4">
              Required Actions
            </h2>

            <div className="space-y-3">
              {actionItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 rounded p-3"
                >
                  <span className="text-gray-400 mr-2">
                    <Info />
                  </span>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
