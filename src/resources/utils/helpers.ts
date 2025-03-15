// resources/utils/helpers.ts
import { GridColDef } from "@mui/x-data-grid";
import { ManpowerItem, EquipmentItem } from "../types";

// Function to toggle presence
export const toggleItemPresence = <T extends { id: string; present: boolean }>(
  items: T[],
  id: string
): T[] => {
  return items.map((item) =>
    item.id === id ? { ...item, present: !item.present } : item
  );
};

// Function to allow only numeric input
export const handleNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>
): void => {
  const value = e.target.value;
  if (/^\d*$/.test(value)) {
    e.target.value = value; // Ensure only numbers
  } else {
    e.target.value = value.replace(/\D/g, ""); // Remove non-numeric characters
  }
};

// Function to get color based on retention value
export const getWarningColor = (value: number): string => {
  // Scale from light blue to dark blue based on retention percentage
  const intensity = Math.floor((value / 100) * 255);
  return `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
};

// resources/utils/index.ts
export * from "./helpers";
