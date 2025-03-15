import { Warning } from "./manpower";

export interface EquipmentItem {
  id: string;
  warning: Warning;
  equipment: string;
  number: string;
  location: string;
  present: boolean;
}
