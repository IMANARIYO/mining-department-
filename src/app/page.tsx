import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


// Icons
import {

  Home,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import ActiveUsers from "@/components/Users";





const page = () => {
  return (
    <div className="">
      {/* <TunnelManagementSystem/> */}
      <main className=" flex flex-col gap-6">
        {/* Memory Usage and System Health */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Memory Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start">
                <div className="flex space-x-4">
                  {/* Memory Usage Bars */}
                  <div className="relative w-12 h-36 bg-amber-800 rounded-full overflow-hidden">
                    <div className="absolute bottom-0 w-full h-3/8 bg-amber-100 rounded-full"></div>
                  </div>
                  <div className="relative w-12 h-36 bg-amber-700 rounded-full overflow-hidden">
                    <div className="absolute bottom-0 w-full h-1/4 bg-amber-100 rounded-full"></div>
                  </div>
                  <div className="relative w-12 h-36 bg-amber-600 rounded-full overflow-hidden">
                    <div className="absolute bottom-0 w-full h-4/5 bg-amber-100 rounded-full"></div>
                  </div>
                  <div className="relative w-12 h-36 bg-amber-500 rounded-full overflow-hidden">
                    <div className="absolute bottom-0 w-full h-4/6 bg-amber-100 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">System Uptime</div>
                    <Badge className="bg-amber-100 text-amber-800 border border-amber-300">
                      50h
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">Last Backup</div>
                    <Badge className="bg-amber-100 text-amber-800 border border-amber-300">
                      21m
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex mt-6 space-x-6">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-700 rounded-full"></span>
                  <span className="text-xs">Storage</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-700 rounded-full"></span>
                  <span className="text-xs">Memory</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-700 rounded-full"></span>
                  <span className="text-xs">Network</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-700 rounded-full"></span>
                  <span className="text-xs">CPU</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>System Health</CardTitle>
              <Badge variant="outline" className="text-gray-500">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-1"></span>
                Feb 12, 2025
                <ChevronDown size={14} className="ml-1" />
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <div className="text-xs text-gray-500">MIN</div>
                  <div className="font-semibold">180 ms</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">AVG</div>
                  <div className="font-semibold">200 ms</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">MAX</div>
                  <div className="font-semibold">247 ms</div>
                </div>
              </div>

              <div className="flex justify-between h-16 w-full mb-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gray-200"
                    style={{
                      height: `${Math.max(30, Math.random() * 100)}%`
                    }}></div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="w-full flex justify-center items-center text-sm mt-4">
                View System Health
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Users */}
        <div>
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="text-sm font-medium mb-4">Active Users</div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-6">
                      {Array.from({ length: 30 })
                        .slice(3, 6)
                        .map((_, i) => (
                          <Avatar key={i} className="border-2 border-white">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                    </div>
                    <div className="flex -space-x-6 hover:space-x-1 group">
                      {Array.from({ length: 30 })
                        .slice(3, 6)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="group-hover:space-x-6 transition-all duration-300">
                            <Avatar className="border-2 border-white group-hover:scale-110 group-hover:border-sky-500 transition-all duration-300">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          </div>
                        ))}
                    </div>

                    <div className="ml-2">
                      <span className="font-bold">18</span>{" "}
                      <span className="text-xs">Users</span>
                    </div>
                    <Badge className="ml-auto bg-green-100 text-green-800 px-2">
                      Online
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="text-sm font-medium mb-4">Active Users</div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Avatar key={i} className="border-2 border-white">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="ml-2">
                      <span className="font-bold">12</span>{" "}
                      <span className="text-xs">Users</span>
                    </div>
                    <Badge className="ml-auto bg-gray-100 text-gray-800 px-2">
                      Offline
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="text-sm font-medium mb-4">Active Users</div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Avatar key={i} className="border-2 border-white">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="ml-2">
                      <span className="font-bold">04</span>{" "}
                      <span className="text-xs">Users</span>
                    </div>
                    <Badge className="ml-auto bg-yellow-100 text-yellow-800 px-2">
                      Pendings
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end mt-4">
            <Button className="bg-gray-900 hover:bg-gray-800">
              <Home className="mr-2 h-4 w-4" />
              View users
            </Button>
          </div>
        </div>
        <ActiveUsers />

        {/* Recent Activity and System Resources */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity Logs</CardTitle>
              <Badge variant="outline" className="text-gray-500">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-1"></span>
                Feb 12, 2025
                <ChevronDown size={14} className="ml-1" />
              </Badge>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-4 font-medium text-gray-500">User</th>
                    <th className="pb-4 font-medium text-gray-500">Action</th>
                    <th className="pb-4 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Maria Joanna</div>
                          <div className="text-xs text-gray-500">ISHIMWE</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">Created a new user.</td>
                    <td className="py-2">
                      <Badge className="bg-gray-900 text-white">
                        Completed
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>KR</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Kelvin RWIHIMBA</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">Approved Gold #23456</td>
                    <td className="py-2">
                      <Badge className="bg-amber-100 text-amber-800">
                        Failed
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Maria Joanna</div>
                          <div className="text-xs text-gray-500">ISHIMWE</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">Created a new user.</td>
                    <td className="py-2">
                      <Badge className="bg-amber-100 text-amber-800">
                        Failed
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Resources</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">
                      System Resources
                    </div>
                    <div className="text-xs text-gray-500">Server Usage</div>
                  </div>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f5f5f4"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#92400e"
                    strokeWidth="8"
                    strokeDasharray="251"
                    strokeDashoffset="100"
                  />
                </svg>
              </div>
            </CardContent>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-700 rounded-full"></span>
                <span className="text-xs">Web Server</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-700 rounded-full"></span>
                <span className="text-xs">Cache</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-700 rounded-full"></span>
                <span className="text-xs">Analytics</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-700 rounded-full"></span>
                <span className="text-xs">Database</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-amber-700 rounded-full"></span>
                <span className="text-xs">Others</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
     
    </div>
  );
};

export default page;
