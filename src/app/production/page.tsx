"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IncidenceReport } from "@/components/mining/incidence";
import { ProductionReport } from "@/components/mining/production";
export default function ProductionPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <Tabs defaultValue="production" className="w-full">
        <TabsList className="mb-8 bg-transparent">
          <TabsTrigger
            value="production"
            className="px-6 py-2 rounded-md data-[state=active]:bg-[#a17d55] data-[state=active]:text-white bg-white border border-gray-200"
          >
            Production
          </TabsTrigger>
          <TabsTrigger
            value="incidence"
            className="px-6 py-2 rounded-md ml-2 data-[state=active]:bg-[#a17d55] data-[state=active]:text-white bg-white border border-gray-200"
          >
            Incidence Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="production">
          <ProductionReport />
        </TabsContent>

        <TabsContent value="incidence">
          <IncidenceReport />
        </TabsContent>
      </Tabs>
    </div>
  );
}
