"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { toast} from "sonner";
import {
  Search,
  Bell,
  ChevronDown,
  Plus,
  FileText,
  MoreVertical
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      toast.success("Files selected", {
        description: `${newFiles.length} file(s) ready for upload.`
      });
    }
  };

  const handleBrowseClick = () => {
    toast.info("Opening file browser", {
      description: "Select files to upload to the system."
    });
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    toast("Ready to receive files", {
      description: "Drop your files here to upload them."
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      toast.success("Files dropped", {
        description: `${newFiles.length} file(s) ready for upload.`
      });
    }
  };

  const handleUpload = () => {
    // In a real application, you would send the files to your server here
    toast.loading("Upload in progress", {
      description: `Uploading ${files.length} file(s) to the server.`
    });

    // Simulate upload success after 2 seconds
    setTimeout(() => {
      toast.success("Upload complete", {
        description: `Successfully uploaded ${files.length} file(s).`
      });
      setFiles([]);
    }, 2000);
  };

  const handleCreateSurvey = () => {
    toast("Creating new survey", {
      description: "Redirecting to survey creation form...",
      action: {
        label: "Cancel",
        onClick: () => toast.error("Survey creation cancelled")
      }
    });
  };

  const handleExportData = () => {
    toast("Exporting data", {
      description: "Preparing data export...",
      action: {
        label: "View",
        onClick: () => toast.info("Opening export viewer...")
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">


      <main className="p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">File Upload</h2>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDragging
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-300"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDragEnter={handleDragEnter}
                  onDrop={handleDrop}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-4 p-3 rounded-full bg-gray-100">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 4V16M12 4L8 8M12 4L16 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 18H4C2.89543 18 2 18.8954 2 20V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V20C22 18.8954 21.1046 18 20 18Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="mb-2 text-sm text-gray-500">
                      Drag and drop file here or click browse
                    </p>
                    <Button
                      variant="secondary"
                      className="bg-amber-700 text-white hover:bg-amber-800"
                      onClick={handleBrowseClick}>
                      Browse File
                    </Button>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Selected Files</h3>
                      <Button
                        onClick={handleUpload}
                        className="bg-amber-700 text-white hover:bg-amber-800">
                        Upload Files
                      </Button>
                    </div>
                    <div className="border rounded-lg divide-y">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-amber-700" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setFiles(files.filter((_, i) => i !== index));
                              toast("File removed", {
                                description: `Removed ${file.name}`
                              });
                            }}>
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-amber-700 text-white hover:bg-amber-800 flex items-center justify-center gap-2"
                    onClick={handleCreateSurvey}>
                    <Plus className="h-5 w-5" />
                    Create New Survey
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-amber-200 text-amber-800 hover:bg-amber-50 flex items-center justify-center gap-2"
                    onClick={handleExportData}>
                    <FileText className="h-5 w-5" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Analytics Summary</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Mountain Ridge Survey
                        </TableCell>
                        <TableCell>2025-January-15</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
                            In Progress
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.info("Viewing project details")
                                }>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => toast.info("Editing project")}>
                                Edit Project
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toast.success("Report downloaded")
                                }>
                                Download Report
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">Analytics Summary</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500">Average Strike/Dip</p>
                    <p className="text-2xl font-bold">
                      45<sup>°</sup>/30<sup>°</sup>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Safety Compliance</p>
                    <p className="text-2xl font-bold">98%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">
              3D Terrain Visualization
            </h2>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src="/terrain-map.png"
                alt="3D Terrain Visualization"
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
