import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SurveyCompletionChart } from "@/components/surveying/survey-completion-chart";
import { PerformanceChart } from "@/components/surveying/performance-chart";


// Create a new MetricCard component at the top of the file, before the Dashboard component

function MetricCard({
  title,
  value,
  progress
}: {
  title: string;
  value: string;
  progress?: number;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            <div className="mt-1 h-[1px] w-full bg-border" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-[#8B6D4B]">{value}</span>
          </div>
          {progress !== undefined && (
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[#8B6D4B]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-md bg-[#8B6D4B] px-4 py-2 text-white">
              <span>Surveying Department</span>
            </div>
            <Button variant="outline" size="icon" className="rounded-md">
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
            <div className="flex items-center gap-2 rounded-full border px-2 py-1 pr-4">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>KR</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <span className="font-medium">Kelvin R.</span>
                <span className="text-xs text-muted-foreground">
                  Managing Director
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container px-4 py-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Mine Sites</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Mine Sites" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Mine Sites</SelectItem>
                <SelectItem value="site1">Site 1</SelectItem>
                <SelectItem value="site2">Site 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tunnels</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Tunnels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tunnels</SelectItem>
                <SelectItem value="tunnel1">Tunnel 1</SelectItem>
                <SelectItem value="tunnel2">Tunnel 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Wings</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Wings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wings</SelectItem>
                <SelectItem value="wing1">Wing 1</SelectItem>
                <SelectItem value="wing2">Wing 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Period</label>
            <Select defaultValue="30">
              <SelectTrigger>
                <SelectValue placeholder="Last 30 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="60">Last 60 Days</SelectItem>
                <SelectItem value="90">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Survey Completion Rate"
            value="87.5%"
            progress={87.5}
          />
          <MetricCard title="Active Surveys" value="24" progress={65} />
          <MetricCard
            title="Equipment utilization"
            value="92.3%"
            progress={92.3}
          />
          <MetricCard title="Safety Score" value="98.1%" progress={98.1} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-medium">
                Survey Completion By Location
              </h3>
              <SurveyCompletionChart/>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-medium">Deviation Analysis</h3>
              <div className="flex justify-center">
                <PerformanceChart />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-medium">
                Survey Efficiency Metrics
              </h3>
              <SurveyCompletionChart />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-medium">
                Historical Survey Comparison
              </h3>
              <div className="flex justify-center">
                <PerformanceChart />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
