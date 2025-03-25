import Image from "next/image";
import { Bell, Search, Maximize2, Layers, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard title="Active Surveys" value="24" />
          <MetricCard title="Field Point" value="8" />
          <MetricCard title="Data Points" value="156K" />
          <MetricCard title="Active Alerts" value="3" />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2 h-full">
              <Card className="mb-6 h-full">
                <CardContent className="p-0">
                  <div className="p-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium">Mine Overview</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Layers className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Maximize2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative aspect-[16/9] w-full p-2">
                    <Image
                      src="/mine-map.png"
                      alt="Mine overview map"
                      fill
                      className="object-cover"
                      
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-medium mb-4">Active Teams</h2>
                  <div className="space-y-4">
                    <TeamCard
                      name="Team Alpha"
                      section="Section A-12"
                      status="Active"
                    />
                    <TeamCard
                      name="Team Beta"
                      section="Section B-5"
                      status="Active"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-medium mb-4">Active Teams</h2>
                  <div className="space-y-4">
                    <AlertCard
                      priority="High Priority"
                      message="Seismic activity detected in Section C-8"
                      time="2 hours ago"
                    />
                    <AlertCard
                      priority="Warning"
                      message="Water level anomaly in Lower Level 2"
                      time="5 hours ago"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">GEOLOGICAL DATA</h2>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Monthly</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Daily</DropdownMenuItem>
                        <DropdownMenuItem>Weekly</DropdownMenuItem>
                        <DropdownMenuItem>Monthly</DropdownMenuItem>
                        <DropdownMenuItem>Yearly</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="h-64">
                    <GeologicalChart />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span>Active Survey</span>
                      <span className="ml-auto font-bold">356,928</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-300"></div>
                      <span>Data Uploaded</span>
                      <span className="ml-auto font-bold">125,736</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6 h-full">
              <Card className="h-full">
                <CardContent className="p-4">
                  <h2 className="text-lg font-medium mb-4">Survey Metrics</h2>
                  <div className="space-y-4">
                    <ProgressBar value={75} />
                    <ProgressBar value={65} />
                    <ProgressBar value={30} />
                    <ProgressBar value={40} />
                    <ProgressBar value={85} />
                    <ProgressBar value={90} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="p-4">
      <CardTitle>{title}</CardTitle>
      <Separator/>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
          
            <h3 className="text-2xl font-bold text-amber-800">{value}</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowUpRight className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamCard({
  name,
  section,
  status
}: {
  name: string;
  section: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      <Avatar>
        <AvatarImage src="/placeholder.svg?height=40&width=40" />
        <AvatarFallback>T</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">{section}</p>
      </div>
      <Badge
        variant="outline"
        className="ml-auto bg-green-50 text-green-600 border-green-200">
        {status}
      </Badge>
    </div>
  );
}

function AlertCard({
  priority,
  message,
  time
}: {
  priority: string;
  message: string;
  time: string;
}) {
  const isPriority = priority.includes("High");

  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <div className="mt-1 p-2 bg-green-100 rounded-md">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 3V21H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 17L12 12L16 16L21 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <h3
          className={`font-medium ${
            isPriority ? "text-red-600" : "text-amber-600"
          }`}>
          {priority}
        </h3>
        <p className="text-sm">{message}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function GeologicalChart() {
  return (
    <div className="w-full h-full flex items-end">
      <svg
        viewBox="0 0 800 300"
        width="100%"
        height="100%"
        preserveAspectRatio="none">
        {/* Y-axis labels */}
        <text x="10" y="20" fontSize="12" fill="#888">
          80
        </text>
        <text x="10" y="80" fontSize="12" fill="#888">
          60
        </text>
        <text x="10" y="140" fontSize="12" fill="#888">
          40
        </text>
        <text x="10" y="200" fontSize="12" fill="#888">
          20
        </text>
        <text x="10" y="260" fontSize="12" fill="#888">
          0
        </text>

        {/* X-axis labels */}
        <text x="50" y="280" fontSize="12" fill="#888">
          March 1
        </text>
        <text x="150" y="280" fontSize="12" fill="#888">
          March 6
        </text>
        <text x="250" y="280" fontSize="12" fill="#888">
          March 11
        </text>
        <text x="350" y="280" fontSize="12" fill="#888">
          March 16
        </text>
        <text x="450" y="280" fontSize="12" fill="#888">
          March 21
        </text>
        <text x="550" y="280" fontSize="12" fill="#888">
          March 26
        </text>
        <text x="650" y="280" fontSize="12" fill="#888">
          March 31
        </text>

        {/* Red line (Active Survey) */}
        <path
          d="M50,200 C100,150 120,100 150,120 C180,140 200,80 250,100 C300,120 320,180 350,150 C380,120 400,180 450,120 C500,60 520,120 550,80 C580,40 600,80 650,120 C700,160 750,120 750,120"
          fill="none"
          stroke="#f87171"
          strokeWidth="3"
        />

        {/* Blue line (Data Uploaded) */}
        <path
          d="M50,220 C100,180 120,120 150,100 C180,80 200,120 250,140 C300,160 320,200 350,180 C380,160 400,220 450,180 C500,140 520,80 550,40 C580,0 600,40 650,120 C700,200 750,160 750,160"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}
