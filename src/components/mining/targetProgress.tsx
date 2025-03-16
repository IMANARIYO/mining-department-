"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export function TargetProgressTracking() {
  // Data for the bar chart
  const chartData = [
    { shift: "Morning", target: 300, actual: 300 },
    { shift: "Afternoon", target: 300, actual: 360 },
    { shift: "Night", target: 300, actual: 280 },
  ];

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div>
          <h2 className="text-lg font-medium text-[#5c4731] mb-4">
            Target Progress Tracking
          </h2>
          <div>
            <div className="flex justify-end gap-4 mb-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#d9d9d9] mr-1 rounded-sm"></div>
                <span>Target</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#a9a9a9] mr-1 rounded-sm"></div>
                <span>Actual</span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-64 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={40}
                  barGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="shift" axisLine={false} tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 600]}
                    tickCount={7}
                  />
                  <Tooltip />
                  <Bar dataKey="target" fill="#d9d9d9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" fill="#a9a9a9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Shift indicators */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 p-3 rounded-md flex justify-between items-center">
              <span>Afternoon Shift</span>
              <ArrowUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="bg-blue-100 p-3 rounded-md flex justify-between items-center">
              <span>Morning Shift</span>
              <ArrowUp className="h-5 w-5 text-blue-500" />
            </div>
            <div className="bg-red-100 p-3 rounded-md flex justify-between items-center">
              <span>Night Shift</span>
              <ArrowDown className="h-5 w-5 text-red-500" />
            </div>
          </div>

          <div className="flex justify-center">
            <Button className="bg-[#a17d55] hover:bg-[#8b6d47] text-white px-6">
              Create Target
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
