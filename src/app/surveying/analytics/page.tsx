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
import { PerformanceChart } from "@/components/surveying/performance-chart";
import { SurveyCompletionChart } from "@/components/surveying/survey-completion-chart";


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">

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
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Survey Completion Rate
                </h3>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-[#8B6D4B]">
                    87.5%
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    +2.5% From Last Period
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Active Surveys
                </h3>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-[#8B6D4B]">24</span>
                  <span className="text-sm font-medium">3 Teams deployed</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Equipment utilization
                </h3>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-[#8B6D4B]">
                    92.3%
                  </span>
                  <span className="text-sm font-medium text-red-600">
                    -1.2% From Last Period
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Safety Score
                </h3>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-[#8B6D4B]">
                    98.1%
                  </span>
                  <span className="text-sm font-medium">
                    No Incidents this Month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-medium">
                Survey Completion By Location
              </h3>
              <SurveyCompletionChart />
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
