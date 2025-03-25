"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import sidebarLogo from "../../public/sidebar-logo.svg";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronLeft, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

// Menu items array
const menuItems = [
  { title: "Performance", url: "/", icon: "⭕" },
  { title: "Production", url: "/production", icon: "🔺" },
  { title: "users", url: "/users", icon: <User/> },
  
  { title: "Inspection", url: "/inspection", icon: "▣" },
  { title: "RFD", url: "/rfd", icon: "☑" },
  { title: "Reports", url: "reports", icon: "↻" },
  { title: "Settings", url: "/", icon: "⚙" },
];

export function NavigationMenu() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Inspection");
  const { toggleSidebar } = useSidebar();
  const { state: isCollapsed } = useSidebar();
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar
      collapsible="icon"
      className={` 
        ${isCollapsed === "expanded" ? "w-64" : "w-16"} 
        transition-all duration-300 ease-in-out overflow-y-auto h-full `}
    >
      <SidebarContent className="w-full flex flex-col justify-between p-4">
        {/* Navigation Menu */}
        <SidebarGroup className="bg-[#ece5d8] rounded-lg h-fit max-h-3/4 overflow-y-auto">
          <SidebarGroupContent>
            {/* Logo and Toggle Button Area */}
            <div className="flex items-center justify-between mb-6 p-2">
              {/* Logo - Always visible */}
              <div className="flex items-center gap-2">
                <img
                  src={sidebarLogo.src}
                  alt="Company Logo"
                  className={`text-[#d48326] transition-all duration-300 bg-[#a17d55] w-${
                    isCollapsed === "expanded" ? "8" : "10"
                  }`}
                />
                {/* Text - Only visible when expanded */}
                {isCollapsed === "expanded" && (
                  <div className="text-[#a17d55] font-bold text-lg">
                    minetech
                  </div>
                )}
              </div>

              {/* Toggle button - Always visible */}
              <Button
                onClick={toggleSidebar}
                variant="ghost"
                className="w-10 h-10 p-2 md:hidden bg-amber-100"
              >
                <ChevronLeft className="w-5 h-5 text-[#8b6d47]" />
              </Button>
            </div>

            <SidebarMenu className="bg-[#ece5d8] rounded-lg p-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <SidebarMenuButton asChild>
                        <Link
                          href={`/mining/${item.url}`}
                          onClick={() => setActiveTab(item.title)}
                          className={`flex items-center transition-all duration-300 relative my-2 py-4 rounded-lg
                            ${
                              activeTab === item.title
                                ? "bg-[#a17d55] text-white font-medium shadow-lg shadow-emerald-900/30 border border-emerald-500"
                                : "text-[#5c4731] hover:bg-[#e6dfd2]"
                            }
                            ${
                              isCollapsed === "expanded"
                                ? "px-4"
                                : "w-12 h-12 justify-center items-center"
                            }
                          `}
                       >
                          <TooltipTrigger asChild>
                            <span className="text-lg">{item.icon}</span>
                          </TooltipTrigger>
                          {isCollapsed === "expanded" && (
                            <span className="ml-3 transition-all duration-300">
                              {item.title}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                      {isCollapsed !== "expanded" && (
                        <TooltipContent
                          side="right"
                          className="bg-emerald-900 text-emerald-50 border-emerald-700 shadow-xl"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Menu with Messages and Theme Toggle */}
        <SidebarGroup className="overflow-y-auto bg-[#ece5d8] rounded-lg p-2 h-fit mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Messages Item */}
              <SidebarMenuItem>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <SidebarMenuButton asChild>
                      <Link
                        href="/"
                        onClick={() => setActiveTab("Messages")}
                        className={`flex items-center transition-all duration-300 relative my-2 py-4 rounded-lg
                          ${
                            activeTab === "Messages"
                              ? "bg-[#a17d55] text-white font-medium shadow-lg shadow-emerald-900/30 border border-emerald-500"
                              : "text-[#5c4731] hover:bg-[#e6dfd2]"
                          }
                          ${
                            isCollapsed === "expanded"
                              ? "px-4"
                              : "w-12 h-12 justify-center items-center"
                          }
                        `}
                      >
                        <TooltipTrigger>
                          <span className="text-lg">💬</span>
                        </TooltipTrigger>
                        {isCollapsed === "expanded" && (
                          <span className="ml-3">Messages</span>
                        )}
                        <span
                          className={`${
                            isCollapsed === "expanded"
                              ? "ml-auto"
                              : "absolute -top-1 -right-1"
                          } bg-red-500 text-white text-xs rounded px-2 py-1`}
                        >
                          9
                        </span>
                      </Link>
                    </SidebarMenuButton>
                    {isCollapsed !== "expanded" && (
                      <TooltipContent
                        side="right"
                        className="bg-emerald-900 text-emerald-50 border-emerald-700 shadow-xl"
                      >
                        Messages (9)
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>

              {/* Theme Toggle Item */}
              <SidebarMenuItem>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => {
                          setTheme(theme === "dark" ? "light" : "dark");
                          setActiveTab("Theme");
                        }}
                        className={`w-full flex items-center transition-all duration-300 relative my-2 py-4 rounded-lg
                          ${
                            activeTab === "Theme"
                              ? "bg-[#a17d55] text-white font-medium shadow-lg shadow-emerald-900/30 border border-emerald-500"
                              : "text-[#5c4731] hover:bg-[#e6dfd2]"
                          }
                          ${
                            isCollapsed === "expanded"
                              ? "px-4"
                              : "w-12 h-12 justify-center items-center"
                          }
                        `}
                      >
                        <TooltipTrigger>
                          {theme === "dark" ? (
                            <Moon className="h-[1.2rem] w-[1.2rem]" />
                          ) : (
                            <Sun className="h-[1.2rem] w-[1.2rem]" />
                          )}
                        </TooltipTrigger>
                        {isCollapsed === "expanded" && (
                          <span className="ml-3">
                            {theme === "dark" ? "Dark" : "Light"} - Mode
                          </span>
                        )}
                      </button>
                    </SidebarMenuButton>
                    {isCollapsed !== "expanded" && (
                      <TooltipContent
                        side="right"
                        className="bg-emerald-900 text-emerald-50 border-emerald-700 shadow-xl"
                      >
                        {theme === "dark" ? "Dark" : "Light"} Mode
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
