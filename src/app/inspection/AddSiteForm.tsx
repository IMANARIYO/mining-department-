import { useState, useEffect } from "react";
import { createSite, getSites } from "@/services/siteService"; // Adjust import path accordingly
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import DataTable from "@/components/DataTable";

const SiteForm = () => {
  const [siteData, setSiteData] = useState({
    name: "",
    location: "",
    projectManager: "",
    startDate: "",
    endDate: ""
  });

  const [sites, setSites] = useState<any[]>([]); // State for storing the fetched sites
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSiteData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createSite(siteData);
      console.log("Site created successfully:", response);
      fetchSites(); // Refetch the list of sites after adding a new one
      // Clear the form and reset the endDate to today
      setSiteData({
        name: "",
        location: "",
        projectManager: "",
        startDate: "",
        endDate: new Date().toISOString().split("T")[0] // Set today's date as the endDate
      });
    } catch (error) {
      console.error("Error creating site:", error);
        setSiteData((prevData) => ({
          ...prevData,
          endDate: new Date().toISOString().split("T")[0] // Set today's date as the endDate
        }));
    }
  };

  // Fetch all sites from the API
  const fetchSites = async () => {
    setLoading(true);
    try {
      const response = await getSites();
      setSites(response.data);
    } catch (error) {
      console.error("Error fetching sites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites(); // Fetch sites when the component mounts
  }, []);
const columns = ["name", "location", "projectManager", "startDate", "endDate"];
const rows = sites

const actions = (site: any) => [
  <Button key="view" variant="outline">
    View
  </Button>,
  <Button key="edit" variant="outline">
    Edit
  </Button>,
  <Button key="delete" variant="outline">
    Delete
  </Button>
];

  return (
    <div className="space-y-8">
      {/* Site Information Form */}
      <Card>
        <CardHeader>
          <CardTitle>Site Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Site Name</Label>
                <Input
                  id="name"
                  placeholder="Enter site name"
                  value={siteData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={siteData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectManager">Project Manager</Label>
                <Input
                  id="projectManager"
                  placeholder="Enter project manager name"
                  value={siteData.projectManager}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Project Start Date</Label>
                  <Input
                    type="date"
                    id="startDate"
                    value={siteData.startDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Expected Completion Date</Label>
                  <Input
                    type="date"
                    id="endDate"
                    value={siteData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="bg-amber-800 hover:bg-amber-900">
              Save Site Information
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* List of Sites */}
      <div className="mt-8">

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-8 flex-1">

          <DataTable
              columns={columns}
              rows={rows}
              actions={actions}
              loading={loading}
              title="All Sites"
            /> 
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteForm;
