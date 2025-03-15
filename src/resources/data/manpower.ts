import { ManpowerItem } from "../types";

export const manpowerInitialData: ManpowerItem[] = [
  {
    id: "1",
    warning: { status: true, message: "No safety helmet" },
    name: "Eric Rukundo",
    role: "Rod",
    location: "Tunnel 1 / Wing 1",
    present: false
  },
  {
    id: "2",
    warning: { status: true, message: "Expired ID" },
    name: "Nshuti Warning",
    role: "SubContractor",
    location: "Tunnel 1 / Wing 1",
    present: false
  },
  {
    id: "3",
    warning: { status: false, message: "" },
    name: "John Doe",
    role: "Foreman",
    location: "Tunnel 2 / Wing 2",
    present: false
  }
];
