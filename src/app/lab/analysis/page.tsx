"use client";

import type React from "react";
import { useState } from "react";
import { Bell, ChevronDown, Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface Department {
  id: string;
  name: string;
  color: string;
}

interface LabRequest {
  requestType: string;
  geologistId: string;
  sampleDescription: string;
  departments: Department[];
  supportingDocuments: File[];
}

export default function SampleSubmissionForm() {
  const [request, setRequest] = useState<LabRequest>({
    requestType: "Chemical Analysis",
    geologistId: "Normal",
    sampleDescription: "",
    departments: [
      { id: "1", name: "Geology", color: "bg-green-100 text-green-800" },
      { id: "2", name: "Mining", color: "bg-blue-100 text-blue-800" },
      { id: "3", name: "Environmental", color: "bg-orange-100 text-orange-800" }
    ],
    supportingDocuments: []
  });

  // Sample dynamic data (this could be fetched from an API or dynamic source)
  const availableDepartments: Department[] = [
    { id: "1", name: "Geology", color: "bg-green-100 text-green-800" },
    { id: "2", name: "Mining", color: "bg-blue-100 text-blue-800" },
    { id: "3", name: "Environmental", color: "bg-orange-100 text-orange-800" },
    { id: "4", name: "Safety", color: "bg-red-100 text-red-800" },
    { id: "5", name: "Exploration", color: "bg-purple-100 text-purple-800" }
  ];

  const geologistIds = ["Normal", "Senior", "Junior"];
  const requestTypes = [
    "Chemical Analysis",
    "Physical Analysis",
    "Biological Analysis"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setRequest((prev) => ({
        ...prev,
        supportingDocuments: [...prev.supportingDocuments, ...Array.from(files)]
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setRequest((prev) => ({
        ...prev,
        supportingDocuments: [
          ...prev.supportingDocuments,
          ...Array.from(e.dataTransfer.files)
        ]
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting request:", request);
  };

  // Add Department logic ensuring no duplicates
  const addDepartment = (department: Department) => {
    if (!request.departments.some((dept) => dept.id === department.id)) {
      setRequest((prev) => ({
        ...prev,
        departments: [...prev.departments, department]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="mx-auto max-w-6xl p-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="text-xl font-bold">NEW SAMPLE</h1>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Request Type</label>
                  <Select
                    defaultValue={request.requestType}
                    onValueChange={(value) =>
                      setRequest((prev) => ({ ...prev, requestType: value }))
                    }>
                    <SelectTrigger className="bg-gray-50">
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      {requestTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Geologist ID</label>
                  <Select
                    defaultValue={request.geologistId}
                    onValueChange={(value) =>
                      setRequest((prev) => ({ ...prev, geologistId: value }))
                    }>
                    <SelectTrigger className="bg-gray-50">
                      <SelectValue placeholder="Select geologist" />
                    </SelectTrigger>
                    <SelectContent>
                      {geologistIds.map((id) => (
                        <SelectItem key={id} value={id}>
                          {id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Sample Description
                </label>
                <Textarea
                  value={request.sampleDescription}
                  onChange={(e) =>
                    setRequest((prev) => ({
                      ...prev,
                      sampleDescription: e.target.value
                    }))
                  }
                  className="min-h-[150px] bg-gray-50"
                  placeholder="Enter sample description here..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Department to Notify
                </label>
                <div className="flex flex-wrap gap-2">
                  {request.departments.map((dept) => (
                    <div
                      key={dept.id}
                      className={`px-3 py-1 rounded-full text-sm ${dept.color}`}>
                      {dept.name}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex h-6 items-center gap-1 rounded-full text-xs"
                    onClick={() => {
                      const departmentToAdd = availableDepartments.find(
                        (dept) =>
                          !request.departments.some((d) => d.id === dept.id)
                      );
                      if (departmentToAdd) {
                        addDepartment(departmentToAdd);
                      }
                    }}>
                    <Plus className="h-3 w-3" />
                    Add Department
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">File Upload</label>
                <div
                  className="border border-dashed rounded-md p-6 text-center cursor-pointer bg-gray-50"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }>
                  <Input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <p className="text-sm text-gray-500">
                    Drag and drop file here
                  </p>
                </div>
                {request.supportingDocuments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Uploaded Files:</p>
                    <ul className="text-sm">
                      {request.supportingDocuments.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-start gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-md px-6">
                  cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-md bg-[#8B6D4B] px-6 hover:bg-[#7A5E3D]">
                  Submit Sample
                </Button>
                <div className="relative inline-flex w-full">
                  <Button
                    type="button"
                    className="rounded-md bg-[#8B6D4B] px-6 hover:bg-[#7A5E3D]">
                    Save Draft
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-0 h-full rounded-l-none rounded-r-md border-l bg-[#8B6D4B] text-white hover:bg-[#7A5E3D]">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
