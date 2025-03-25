"use client";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlastLog } from "./blast-log-columns";

interface ViewBlastLogDialogProps {
  blastLog: BlastLog;
}

export function ViewBlastLogDialog({ blastLog }: ViewBlastLogDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer w-full">
          <Eye className="mr-2 h-4 w-4" />
          View details
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Blast Log Details</DialogTitle>
          <DialogDescription>
            Complete information about this blast operation
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="safety">Safety Checklist</TabsTrigger>
            <TabsTrigger value="team">Team Information</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Blast ID</Label>
                      <p className="font-medium">{blastLog.blastId}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        Date & Time
                      </Label>
                      <p className="font-medium">
                        {format(new Date(blastLog.dateTime), "PPpp")}
                      </p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Location</Label>
                      <p className="font-medium">{blastLog.blastLocation}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Tunnel ID</Label>
                      <p className="font-medium">{blastLog.tunnelId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ground Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Rock Type</Label>
                      <p className="font-medium">{blastLog.rockType}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        Ground Stability
                      </Label>
                      <p className="font-medium">{blastLog.groundStability}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        Water Presence
                      </Label>
                      <p className="font-medium">{blastLog.waterPresence}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        Ground Temperature
                      </Label>
                      <p className="font-medium">
                        {blastLog.groundTemperature}°C
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blast Hole Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">
                        Number of Holes
                      </Label>
                      <p className="font-medium">{blastLog.numberOfHoles}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        Hole Depth
                      </Label>
                      <p className="font-medium">{blastLog.holeDepth} meters</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        Hole Diameter
                      </Label>
                      <p className="font-medium">{blastLog.holeDiameter} mm</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">
                        Hole Condition
                      </Label>
                      <p className="font-medium">{blastLog.holeCondition}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Safety Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <Label>Ventilation Plan Implemented</Label>
                    <Badge
                      variant={
                        blastLog.ventilationPlan ? "default" : "destructive"
                      }>
                      {blastLog.ventilationPlan ? "Completed" : "Not Completed"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <Label>Area Evacuated and Secured</Label>
                    <Badge
                      variant={
                        blastLog.areaEvacuated ? "default" : "destructive"
                      }>
                      {blastLog.areaEvacuated ? "Completed" : "Not Completed"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <Label>Personnel Accounted For</Label>
                    <Badge
                      variant={
                        blastLog.personnelAccounted ? "default" : "destructive"
                      }>
                      {blastLog.personnelAccounted
                        ? "Completed"
                        : "Not Completed"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <Label>Equipment Removed from Blast Area</Label>
                    <Badge
                      variant={
                        blastLog.equipmentRemoved ? "default" : "destructive"
                      }>
                      {blastLog.equipmentRemoved
                        ? "Completed"
                        : "Not Completed"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Team Lead</Label>
                    <p className="font-medium">
                      {blastLog.teamLeadSignature || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <Label className="text-muted-foreground mb-2 block">
                      Team Members
                    </Label>
                    {blastLog.teamMembers.length > 0 ? (
                      <ul className="space-y-2">
                        {blastLog.teamMembers.map((member, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
                              {index + 1}
                            </Badge>
                            <span>{member}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">
                        No team members recorded
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
