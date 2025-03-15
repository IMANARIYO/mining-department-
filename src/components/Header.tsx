"use client";

import React from "react";
import { Bell, ChevronDown, ChevronLeft, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar"; // ✅ Import useSidebar

export function Header() {
  const { toggleSidebar } = useSidebar(); // ✅ Sidebar Toggle Function

  return (
    <header className="bg-white flex items-center justify-between p-4 border-b shadow-sm h-fit sticky top-0 z-10">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* ✅ Sidebar Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar} // ✅ Click to toggle sidebar
          className="z-20">
          {" "}
          {/* Added z-index for visibility */}
          <Menu size={20} />
        </Button>

   

        {/* Admin Console & Search (Hidden on Small Screens) */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" className="ml-4">
            <ChevronLeft size={16} className="mr-1" />
            Admin Console
          </Button>
          <Button variant="outline" size="icon" className="ml-1">
            <Search size={16} />
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>

        {/* User Info */}
        <div className="flex items-center gap-2">
          {/* User Details (Hidden on Small Screens) */}
          <div className="hidden md:block text-right text-sm mr-1">
            <div className="font-medium">Kelvin R.</div>
            <div className="text-gray-500 text-xs">Managing Director</div>
          </div>

          {/* Avatar */}
          <Avatar className="border-2 border-amber-600">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>KR</AvatarFallback>
          </Avatar>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
