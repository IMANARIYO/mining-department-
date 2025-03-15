// resources/data/blast.ts
import { BlastLogItem } from "../types";

export const blastLogInitialData: BlastLogItem[] = [
  {
    id: 1,
    date: "2025-03-08",
    time: "14:30",
    tunnel: "Tunnel #1",
    location: 156.5,
    pattern: "Burn Cut",
    explosive: "45.2 kg ANFO",
    result: "Good"
  },
  {
    id: 2,
    date: "2025-03-07",
    time: "15:15",
    tunnel: "Tunnel #1",
    location: 152.0,
    pattern: "Burn Cut",
    explosive: "43.8 kg ANFO",
    result: "Excellent"
  },
  {
    id: 3,
    date: "2025-03-06",
    time: "14:45",
    tunnel: "Tunnel #1",
    location: 146.8,
    pattern: "Wedge Cut",
    explosive: "40.5 kg ANFO",
    result: "Satisfactory"
  }
];
