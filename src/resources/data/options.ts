

// resources/data/options.ts
import { SelectOption, TabItem } from '../types';

export const mineSites: SelectOption[] = [
  { value: "site1", label: "Mine Site 1" },
  { value: "site2", label: "Mine Site 2" },
  { value: "site3", label: "Mine Site 3" }
];

export const tunnels: SelectOption[] = [
  { value: "tunnel1", label: "Tunnel 1" },
  { value: "tunnel2", label: "Tunnel 2" },
  { value: "tunnel3", label: "Tunnel 3" },
  { value: "tunnel4", label: "Tunnel 4" },
  { value: "tunnel5", label: "Tunnel 5" },
  { value: "tunnel6", label: "Tunnel 6" },
  { value: "tunnel7", label: "Tunnel 7" },
  { value: "tunnel8", label: "Tunnel 8" }
];

export const shifts: SelectOption[] = [
  { value: "day", label: "Day Shift" },
  { value: "night", label: "Night Shift" }
];

export const incidents: SelectOption[] = [
  { value: "fall", label: "Rock Fall" },
  { value: "fire", label: "Fire" }
];

export const tabs: TabItem[] = [
  { value: "site-info", label: "Site Information" },
  { value: "tunnel-dimensions", label: "Create Tunnel Dimensions" },
  { value: "report", label: "Incident Reporting" },
  { value: "tunnel-advancements", label: "Tunnel Advancements" },
  { value: "blast-log", label: "Blast Log Detail" },
  { value: "production", label: "Production Reporting" }
];

export const blastPatterns: SelectOption[] = [
  { value: "wedge-cut", label: "Wedge Cut" },
  { value: "burn-cut", label: "Burn Cut" },
  { value: "v-cut", label: "V-Cut" },
  { value: "fan-cut", label: "Fan Cut" }
];

export const explosiveTypes: SelectOption[] = [
  { value: "anfo", label: "ANFO" },
  { value: "emulsion", label: "Emulsion" },
  { value: "dynamite", label: "Dynamite" },
  { value: "slurry", label: "Slurry" }
];

export const blastResults: SelectOption[] = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "satisfactory", label: "Satisfactory" },
  { value: "poor", label: "Poor" },
  { value: "failed", label: "Failed" }
];

export const advancementMethods: SelectOption[] = [
  { value: "tbm", label: "Tunnel Boring Machine (TBM)" },
  { value: "drill-blast", label: "Drill and Blast" },
  { value: "natm", label: "New Austrian Tunneling Method" },
  { value: "cut-cover", label: "Cut and Cover" }
];
