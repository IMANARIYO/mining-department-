import React, { useEffect, useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import { DatePicker } from "@/components/DatePicker";
import { getSites, getTunnelsBySiteId } from "@/services/siteService";
import { useSiteStore } from "@/siteStore";

// Define type for site and tunnel
interface Site {
  id: string;
  name: string;
}

interface Tunnel {
  id: string;
  name: string;
}

interface FilterBarProps {
  onFilterChange: (filters: {
    selectedMineSite: Site | null;
    selectedTunnel: Tunnel | null;
    selectedShift: string | null;
    selectedDate: Date | undefined;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  // const [mineSites, setMineSites] = useState<Site[]>([]);
  const [tunnels, setTunnels] = useState<Tunnel[]>([]);

  const shifts = [
    { value: "day", label: "Day Shift" },
    { value: "night", label: "Night Shift" }
  ];
const { mineSites, fetchSitesData } = useSiteStore();
  const [selectedMineSite, setSelectedMineSite] = useState<Site | null>(null);
  const [selectedTunnel, setSelectedTunnel] = useState<Tunnel | null>(null);
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Fetch mine sites
// useEffect(() => {
//   fetchSitesData();
// }, []);
  // Fetch tunnels when a mine site is selected
  useEffect(() => {
    if (!selectedMineSite) return;

    const fetchTunnels = async () => {
      try {
        const response = await getTunnelsBySiteId(selectedMineSite.id);
        setTunnels(response.data);

        // If tunnels are available, set the first one as default
        setSelectedTunnel(response.data.length > 0 ? response.data[0] : null);
      } catch (error) {
        console.error("Failed to fetch tunnels:", error);
      }
    };

    fetchTunnels();
  }, [selectedMineSite]);

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange({
      selectedMineSite,
      selectedTunnel,
      selectedShift,
      selectedDate
    });
  }, [
    selectedMineSite,
    selectedTunnel,
    selectedShift,
    selectedDate,
    onFilterChange
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <CustomSelect
        options={mineSites.map((site) => ({
          value: site.id,
          label: site.name
        }))}
        placeholder="Select Mine Site"
        onChange={(value) => {
          const site = mineSites.find((s) => s.id === value) || null;
          setSelectedMineSite(site);
        }}
        value={selectedMineSite?.id || ""}
      />
      <CustomSelect
        options={tunnels.map((tunnel) => ({
          value: tunnel.id,
          label: tunnel.name
        }))}
        placeholder="Select Tunnel ID"
        onChange={(value) => {
          const tunnel = tunnels.find((t) => t.id === value) || null;
          setSelectedTunnel(tunnel);
        }}
        value={selectedTunnel?.id || ""}
      />
      <CustomSelect
        options={shifts}
        placeholder="Select Shift"
        onChange={(value) => setSelectedShift(value)}
        value={selectedShift}
      />
      <div className="relative">
        <DatePicker onDateChange={setSelectedDate} />
      </div>
    </div>
  );
};

export default FilterBar;
