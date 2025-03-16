// SiteForm.tsx - Main component
import { useState, useEffect } from "react";
import { getSites } from "@/services/siteService";
import SiteFormSection from "./SiteFormSection";
import SiteTable from "./SiteTable";
// Types defined inline
interface Site {
  id: string;
  name: string;
  location: string;
  projectManager: string;
  startDate: string;
  endDate: string;
}

const SiteForm = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  // Fetch all sites
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

  const handleSuccess = () => {
    fetchSites();
  };

  const handleEdit = (site: Site) => {
    setSelectedSite(site);
  };

  useEffect(() => {
    fetchSites();
  }, []);

  return (
    <div className="space-y-8">
      <SiteFormSection onSubmitSuccess={fetchSites} />

      <SiteTable sites={sites} loading={loading} onDeleteSuccess={fetchSites} />
    </div>
  );
};

export default SiteForm;
