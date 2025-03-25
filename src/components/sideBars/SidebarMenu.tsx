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
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { ChevronLeft, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

// Define types for menu items
type MenuItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  title: string;
  basePath: string;
  menuItems: MenuItem[];
};

export function SidebarMenuComponent({
  title,
  basePath,
  menuItems
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState(menuItems[0]?.title || "");
  const { toggleSidebar, state: isCollapsed } = useSidebar();
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar
      collapsible="icon"
      className={`${
        isCollapsed === "expanded" ? "w-64" : "w-16"
      } transition-all duration-300 ease-in-out overflow-y-auto h-full`}>
      <SidebarContent className="w-full flex flex-col justify-between p-4">
        {/* Top Section */}
        <SidebarGroup className="bg-[#ece5d8] rounded-lg h-fit max-h-3/4 overflow-y-auto">
          <SidebarGroupContent>
            {/* Logo and Toggle Button */}
            <div className="flex items-center justify-between mb-6 p-2">
              <div className="flex items-center gap-2">
                <img
                  src={sidebarLogo.src}
                  alt="Company Logo"
                  className={`transition-all duration-300 bg-[#a17d55] w-${
                    isCollapsed === "expanded" ? "8" : "10"
                  }`}
                />
                {isCollapsed === "expanded" && (
                  <div className="text-[#a17d55] font-bold text-lg">
                    {title}
                  </div>
                )}
              </div>
              <Button
                onClick={toggleSidebar}
                variant="ghost"
                className="w-10 h-10 p-2 md:hidden bg-amber-100">
                <ChevronLeft className="w-5 h-5 text-[#8b6d47]" />
              </Button>
            </div>

            {/* Menu Items */}
            <SidebarMenu className="bg-[#ece5d8] rounded-lg p-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <SidebarMenuButton asChild>
                        <Link
                          href={`${basePath}/${item.url}`}
                          onClick={() => setActiveTab(item.title)}
                          className={`flex items-center transition-all duration-300 relative my-2 py-4 rounded-lg
                            ${
                              activeTab === item.title
                                ? "bg-[#a17d55] text-white font-medium shadow-lg border border-emerald-500"
                                : "text-[#5c4731] hover:bg-[#e6dfd2]"
                            }
                            ${
                              isCollapsed === "expanded"
                                ? "px-4"
                                : "w-12 h-12 justify-center items-center"
                            }
                          `}>
                          <TooltipTrigger asChild>
                            <span className="text-lg">{item.icon}</span>
                          </TooltipTrigger>
                          {isCollapsed === "expanded" && (
                            <span className="ml-3">{item.title}</span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                      {isCollapsed !== "expanded" && (
                        <TooltipContent
                          side="right"
                          className="bg-emerald-900 text-emerald-50 border-emerald-700 shadow-xl">
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

        {/* Bottom Section */}
        <SidebarGroup className="overflow-y-auto bg-[#ece5d8] rounded-lg p-2 h-fit mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Theme Toggle */}
              <SidebarMenuItem>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className={`w-full flex items-center transition-all duration-300 relative my-2 py-4 rounded-lg
                          ${
                            theme === "dark"
                              ? "bg-[#a17d55] text-white"
                              : "text-[#5c4731] hover:bg-[#e6dfd2]"
                          }
                          ${
                            isCollapsed === "expanded"
                              ? "px-4"
                              : "w-12 h-12 justify-center items-center"
                          }
                        `}>
                        <TooltipTrigger>
                          {theme === "dark" ? (
                            <Moon className="h-[1.2rem] w-[1.2rem]" />
                          ) : (
                            <Sun className="h-[1.2rem] w-[1.2rem]" />
                          )}
                        </TooltipTrigger>
                        {isCollapsed === "expanded" && (
                          <span className="ml-3">
                            {theme === "dark" ? "Dark" : "Light"} Mode
                          </span>
                        )}
                      </button>
                    </SidebarMenuButton>
                    {isCollapsed !== "expanded" && (
                      <TooltipContent
                        side="right"
                        className="bg-emerald-900 text-emerald-50 border-emerald-700 shadow-xl">
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
