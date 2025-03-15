import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TunnelManagementSystem() {
  const tabs = [
    { value: "site-info", label: "Site Informations" },
    { value: "tunnel-dimensions", label: "Create Tunnel Dimensionss" },
    { value: "tunnel-advancements", label: "Tunnel Advancementss" },
    { value: "blast-log", label: "Blast Log Detaill" }
  ];
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Tunnel Management System</h1>

      <Tabs defaultValue="site-info" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-amber-800 data-[state=active]:text-white data-[state=active]:border-amber-800">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Site Information Tab Content */}
        <TabsContent value="site-info">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" placeholder="Enter site name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter location" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-manager">Project Manager</Label>
                    <Input
                      id="project-manager"
                      placeholder="Enter project manager name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Project Start Date</Label>
                      <Input type="date" id="start-date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end-date">Expected Completion Date</Label>
                      <Input type="date" id="end-date" />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-amber-800 hover:bg-amber-900">
                  Save Site Information
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tunnel Dimensions Tab Content */}
        <TabsContent value="tunnel-dimensions">
          <Card>
            <CardHeader>
              <CardTitle>Create Tunnel Dimensions</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tunnel-id">Tunnel ID</Label>
                    <Input id="tunnel-id" placeholder="Enter tunnel ID" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tunnel-type">Tunnel Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tunnel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="utility">Utility</SelectItem>
                        <SelectItem value="mining">Mining</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tunnel-length">Total Length (m)</Label>
                    <Input
                      id="tunnel-length"
                      type="number"
                      placeholder="Enter length"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tunnel-diameter">Diameter (m)</Label>
                      <Input
                        id="tunnel-diameter"
                        type="number"
                        step="0.1"
                        placeholder="Enter diameter"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tunnel-cross-section">
                        Cross-Section Area (m²)
                      </Label>
                      <Input
                        id="tunnel-cross-section"
                        type="number"
                        step="0.1"
                        placeholder="Enter cross-section area"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-amber-800 hover:bg-amber-900">
                  Save Tunnel Dimensions
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tunnel Advancements Tab Content */}
        <TabsContent value="tunnel-advancements">
          <Card>
            <CardHeader>
              <CardTitle>Tunnel Advancements</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="advancement-date">Date</Label>
                      <Input id="advancement-date" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tunnel-select">Select Tunnel</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tunnel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tunnel-1">Tunnel #1</SelectItem>
                          <SelectItem value="tunnel-2">Tunnel #2</SelectItem>
                          <SelectItem value="tunnel-3">Tunnel #3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advancement-distance">
                      Advancement Distance (m)
                    </Label>
                    <Input
                      id="advancement-distance"
                      type="number"
                      step="0.1"
                      placeholder="Enter distance"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advancement-method">Method Used</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tbm">
                          Tunnel Boring Machine (TBM)
                        </SelectItem>
                        <SelectItem value="drill-blast">
                          Drill and Blast
                        </SelectItem>
                        <SelectItem value="natm">
                          New Austrian Tunneling Method
                        </SelectItem>
                        <SelectItem value="cut-cover">Cut and Cover</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advancement-notes">Notes</Label>
                    <Textarea
                      id="advancement-notes"
                      placeholder="Enter notes"
                      rows={4}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-amber-800 hover:bg-amber-900">
                  Record Advancement
                </Button>
              </form>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">
                  Recent Advancements
                </h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Tunnel</TableHead>
                        <TableHead>Distance (m)</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Cumulative (m)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2025-03-08</TableCell>
                        <TableCell>Tunnel #1</TableCell>
                        <TableCell>4.5</TableCell>
                        <TableCell>Drill and Blast</TableCell>
                        <TableCell>156.5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-03-07</TableCell>
                        <TableCell>Tunnel #1</TableCell>
                        <TableCell>5.2</TableCell>
                        <TableCell>Drill and Blast</TableCell>
                        <TableCell>152.0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-03-07</TableCell>
                        <TableCell>Tunnel #2</TableCell>
                        <TableCell>8.7</TableCell>
                        <TableCell>TBM</TableCell>
                        <TableCell>203.4</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blast Log Detail Tab Content */}
        <TabsContent value="blast-log">
          <Card>
            <CardHeader>
              <CardTitle>Blast Log Detail</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blast-date">Blast Date</Label>
                      <Input id="blast-date" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blast-time">Blast Time</Label>
                      <Input id="blast-time" type="time" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blast-tunnel">Tunnel</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tunnel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tunnel-1">Tunnel #1</SelectItem>
                          <SelectItem value="tunnel-2">Tunnel #2</SelectItem>
                          <SelectItem value="tunnel-3">Tunnel #3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blast-location">Chainage (m)</Label>
                      <Input
                        id="blast-location"
                        type="number"
                        step="0.1"
                        placeholder="Enter chainage"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="blast-pattern">Blast Pattern</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedge-cut">Wedge Cut</SelectItem>
                          <SelectItem value="burn-cut">Burn Cut</SelectItem>
                          <SelectItem value="v-cut">V-Cut</SelectItem>
                          <SelectItem value="fan-cut">Fan Cut</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hole-count">Number of Holes</Label>
                      <Input
                        id="hole-count"
                        type="number"
                        placeholder="Enter hole count"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="explosive-type">Explosive Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select explosive type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anfo">ANFO</SelectItem>
                          <SelectItem value="emulsion">Emulsion</SelectItem>
                          <SelectItem value="dynamite">Dynamite</SelectItem>
                          <SelectItem value="slurry">Slurry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="explosive-quantity">
                        Explosive Quantity (kg)
                      </Label>
                      <Input
                        id="explosive-quantity"
                        type="number"
                        step="0.1"
                        placeholder="Enter quantity"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blast-result">Blast Result</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="satisfactory">
                          Satisfactory
                        </SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blast-notes">Notes</Label>
                    <Textarea
                      id="blast-notes"
                      placeholder="Enter notes"
                      rows={4}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-amber-800 hover:bg-amber-900">
                  Record Blast
                </Button>
              </form>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">
                  Recent Blast Records
                </h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Tunnel</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Pattern</TableHead>
                        <TableHead>Explosive</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2025-03-08</TableCell>
                        <TableCell>14:30</TableCell>
                        <TableCell>Tunnel #1</TableCell>
                        <TableCell>156.5</TableCell>
                        <TableCell>Burn Cut</TableCell>
                        <TableCell>45.2 kg ANFO</TableCell>
                        <TableCell>Good</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-03-07</TableCell>
                        <TableCell>15:15</TableCell>
                        <TableCell>Tunnel #1</TableCell>
                        <TableCell>152.0</TableCell>
                        <TableCell>Burn Cut</TableCell>
                        <TableCell>43.8 kg ANFO</TableCell>
                        <TableCell>Excellent</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2025-03-06</TableCell>
                        <TableCell>14:45</TableCell>
                        <TableCell>Tunnel #1</TableCell>
                        <TableCell>146.8</TableCell>
                        <TableCell>Wedge Cut</TableCell>
                        <TableCell>40.5 kg ANFO</TableCell>
                        <TableCell>Satisfactory</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}