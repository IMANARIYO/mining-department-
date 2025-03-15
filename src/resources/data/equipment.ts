// resources/data/equipment.ts
import { EquipmentItem } from "../types";

export const equipmentInitialData: EquipmentItem[] = [
  {
    id: "1",
    warning: { status: true, message: "Needs maintenance" },
    equipment: "Pumps",
    number: "2",
    location: "Tunnel 1",
    present: false
  },
  {
    id: "2",
    warning: { status: false, message: "" },
    equipment: "Bobcat",
    number: "1",
    location: "Site 1",
    present: false
  }
];
